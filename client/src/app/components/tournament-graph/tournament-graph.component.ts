import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  GetAllMatches,
  GetAllMatchesSuccess
} from "../../data/stores/main-store";
import { State } from "../../data/stores/main-store/state";
import { ActivatedRoute, Params } from "@angular/router";
import { SubSink } from "subsink";
import { Match } from "src/app/data/models/match";
import { selectAllMatches } from "src/app/data/stores/main-store/selectors";

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";

import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { MatchService } from "src/app/data/services/match.service";
import {
  debounceTime,
  map,
  switchMap,
  tap,
  delay,
  throttleTime
} from "rxjs/operators";
import { TournamentService } from "src/app/data/services/tournament.service";
import { PHASE } from "src/app/data/models/util";
import {
  TournamentPhase,
  TournamentGraph
} from "src/app/data/models/tournament";

@Component({
  selector: "app-tournament-graph",
  templateUrl: "./tournament-graph.component.html",
  styleUrls: ["./tournament-graph.component.css"]
})
export class TournamentGraphComponent implements OnInit, OnDestroy {
  disableFinishMatchBtn = true;
  public tournamentInProgress = [];
  private subs = new SubSink();
  tournamentId: number = 0;
  matches: Match[] = [];
  matches2: Match[] = [];

  // NEW *******************
  phases: PHASE[] = [
    PHASE.FINALE,
    PHASE.SEMI_FINALS,
    PHASE.QUARTER_FINALS,
    PHASE.EIGHTH_FINALS,
    PHASE.SIXTEENTH_FINALS
  ];
  graphColumns: string[] = []; //phases in the tournament
  displayedGraphColumns: string[] = []; //phase names
  tournamentGraph: TournamentGraph[] = []; //we will have one graph but the table receives a array for the data source
  numberOfPhases: number = 0;

  // ***********************

  // displayedColumnsForPlayers: string[] = [
  //   "scoreHome",
  //   "scoreGuest",
  //   "drowPosition",
  //   "phaseName"
  // ];

  // tournamentGraphGroup: FormGroup;
  dataSourceMatches = new MatTableDataSource<TournamentGraph>(
    this.tournamentGraph
  );
  // selectionForMatches = new SelectionModel<any>(true, []);

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private matchService: MatchService, // private _formBuilder: FormBuilder
    private tournamentService: TournamentService
  ) {
    // this.tournamentGraphGroup = this._formBuilder.group({});
  }

  ngOnInit() {
    this.subs.sink = this.route.params.subscribe((params: Params) => {
      this.tournamentId = params.id;
    });
    //GET MATCHES
    this.store.dispatch(new GetAllMatches(this.tournamentId));
    this.subs.sink = this.store.select(selectAllMatches).subscribe(data => {
      this.matches = data;
      //this.dataSourceMatches = new MatTableDataSource<any>(this.matches);

      // NEW *******************
      //console.log("Number of matches: " + this.matches.length);
      if (this.matches[0]) {
        // console.log(this.matches[0]);
        let phaseCounter = 0;
        let phaseMatch = this.matches[0].phaseName;
        //console.log("Phase matches: " + phaseMatch);
        let isFinded = false;
        for (let i = this.phases.length; i >= 0; i--) {
          if (phaseMatch === this.phases[i]) {
            isFinded = true;
            //this.displayedGraphColumns.push(this.phases[i]);
          }
          if (isFinded) {
            phaseCounter++;
            this.displayedGraphColumns.push(this.phases[i]);
            this.graphColumns.push(this.phases[i]);
          }
        }
        this.numberOfPhases = phaseCounter;
        let matchesArray: Match[] = [];
        let tournamentGraphLocal: TournamentGraph = new TournamentGraph();
        tournamentGraphLocal.tournamentPhases = [];
        for (let i = phaseCounter - 1; i >= 0; i--) {
          for (let j = 0; j < this.matches.length; j++) {
            if (this.matches[j].phaseName === this.phases[i]) {
              matchesArray.push(this.matches[j]);
              //console.log("Current phase:" + this.matches[j].phaseName);
            }
          }
          let tournamentPhase: TournamentPhase = new TournamentPhase();
          tournamentPhase.name = this.phases[i];
          console.log("Name phase:" + tournamentPhase.name);
          tournamentPhase.matches = matchesArray.sort(
            (a, b) => a.drowPosition - b.drowPosition
          );
          //console.log("Matches length before:" + matchesArray.length);
          tournamentGraphLocal.tournamentPhases.push(tournamentPhase);
          matchesArray = [];
          // console.log("Matches length:" + matchesArray.length);
        }
        this.tournamentGraph.push(tournamentGraphLocal);
        this.dataSourceMatches = new MatTableDataSource<TournamentGraph>(
          this.tournamentGraph
        );
      }
      // this.dataSourceMatches = new MatTableDataSource<any>(this.matches);
    });
    //
  }

  resultIncrementHandler(
    matchWithNewResult: Match,
    homeOrGuest: "home" | "guest"
  ): void {
    this.disableFinishMatchBtn = false;
    for (let phase of this.tournamentGraph[0].tournamentPhases) {
      phase.matches = phase.matches.map(match => {
        if (match.id === matchWithNewResult.id && homeOrGuest === "home") {
          const updatedMatch = {
            ...match,
            scoreHome: matchWithNewResult.scoreHome + 1
          };

          this.saveScore(
            updatedMatch.idTournament,
            updatedMatch.id,
            updatedMatch.scoreHome,
            updatedMatch.scoreGuest
          );
          return updatedMatch;
        } else if (
          match.id === matchWithNewResult.id &&
          homeOrGuest === "guest"
        ) {
          const updatedMatch = {
            ...match,
            scoreGuest: matchWithNewResult.scoreGuest + 1
          };

          this.saveScore(
            updatedMatch.idTournament,
            updatedMatch.id,
            updatedMatch.scoreHome,
            updatedMatch.scoreGuest
          );
          return updatedMatch;
        } else {
          return match;
        }
      });
    }
  }

  resultSubtracthandler(
    matchWithNewResult: Match,
    homeOrGuest: "home" | "guest"
  ): void {
    this.disableFinishMatchBtn = false;
    for (let phase of this.tournamentGraph[0].tournamentPhases) {
      phase.matches = phase.matches.map(match => {
        if (
          match.id === matchWithNewResult.id &&
          homeOrGuest === "home" &&
          match.scoreHome !== 0
        ) {
          const updatedMatch = {
            ...match,
            scoreHome: matchWithNewResult.scoreHome - 1
          };

          this.saveScore(
            updatedMatch.idTournament,
            updatedMatch.id,
            updatedMatch.scoreHome,
            updatedMatch.scoreGuest
          );
          return updatedMatch;
        } else if (
          match.id === matchWithNewResult.id &&
          homeOrGuest === "guest" &&
          match.scoreGuest !== 0
        ) {
          const updatedMatch = {
            ...match,
            scoreGuest: matchWithNewResult.scoreGuest - 1
          };

          this.saveScore(
            updatedMatch.idTournament,
            updatedMatch.id,
            updatedMatch.scoreHome,
            updatedMatch.scoreGuest
          );
          return updatedMatch;
        } else {
          return match;
        }
      });
    }
  }

  finishMatchHandler(matchForFinish: Match) {
    this.subs.sink = this.tournamentService
      .finishMatch(matchForFinish)
      .subscribe(data => {
        matchForFinish.deleted = data["deleted"];
      });

    let currentPhase = matchForFinish.phaseName;
    console.log("Phase: " + currentPhase);
    let localTournamentPhase: TournamentPhase;
    let currentPhasePosition: number = 0;

    for (let i = 0; i < this.tournamentGraph[0].tournamentPhases.length; i++) {
      if (this.tournamentGraph[0].tournamentPhases[i].name === currentPhase) {
        localTournamentPhase = this.tournamentGraph[0].tournamentPhases[i];
        currentPhasePosition = i;
        console.log("Phase position: " + currentPhasePosition);
        break;
      }
    }
    let allMatchesCompleted = true;
    localTournamentPhase.matches.forEach(match => {
      if (!match.deleted) {
        allMatchesCompleted = false;
      }
    });

    if (allMatchesCompleted) {
      let drawPosition = 1;
      let idHomeTeam;
      let idGuestTeam;
      let idHomeUser;
      let idGuestUser;
      localTournamentPhase.matches.sort(
        (a, b) => a.drowPosition - b.drowPosition
      );
      for (let i = 0; i < localTournamentPhase.matches.length; ) {
        if (
          //setting the match host in the next phase
          localTournamentPhase.matches[i].scoreHome >
          localTournamentPhase.matches[i].scoreGuest
        ) {
          idHomeTeam = localTournamentPhase.matches[i].idHomeTeam;
          idHomeUser = localTournamentPhase.matches[i].idHomeUser;
        } else {
          idHomeTeam = localTournamentPhase.matches[i].idGuestTeam;
          idHomeUser = localTournamentPhase.matches[i].idGuestUser;
        }
        if (
          //setting the match guest in the next phase
          localTournamentPhase.matches[i + 1].scoreHome >
          localTournamentPhase.matches[i + 1].scoreGuest
        ) {
          idGuestTeam = localTournamentPhase.matches[i + 1].idHomeTeam;
          idGuestUser = localTournamentPhase.matches[i + 1].idHomeUser;
        } else {
          idGuestTeam = localTournamentPhase.matches[i + 1].idGuestTeam;
          idGuestUser = localTournamentPhase.matches[i + 1].idGuestUser;
        }
        i += 2; //taking matches in pairs
        currentPhasePosition++;
        console.log(
          this.tournamentGraph[0].tournamentPhases[0].name +
            "----" +
            this.tournamentGraph[0].tournamentPhases[1].name +
            "-----" +
            currentPhasePosition
        );
        let json = {
          scoreHome: 0,
          scoreGuest: 0,
          drowPosition: drawPosition,
          phaseName: this.tournamentGraph[0].tournamentPhases[
            currentPhasePosition
          ].name,
          deleted: false,
          idHomeTeam: idHomeTeam,
          idGuestTeam: idGuestTeam,
          idTournament: localTournamentPhase.matches[i].idTournament,
          idHomeUser: idHomeUser,
          idGuestUser: idGuestUser
        };
        console.log(json);
        this.matchService.createMatch(json);
        drawPosition++;
      }
    }

    // { match.idTournament, match.id, match.scoreHome, match.scoreGuest }
    // do stuff on backend
    // if (this.matches2.length % 2 === 0) {
    //   if (match.scoreGuest > match.scoreHome) {
    //     this.matches2.push({
    //       id,
    //       guestUser: match.guestUser,
    //       guestTeam: match.guestTeam,
    //       scoreGuest: 0,
    //       drowPosition: 1,
    //       phaseName: "whatup",
    //       idTournament: this.matches[0].idTournament,
    //     });
    //     console.log(match);
    //     console.log("guest won");
    //   } else {
    //     console.log("home won");
    //   }
    // } else {
    //   this.matches2.push(match);
    //   console.log("crap2");
    // }
    // const winner = match.filter()
    // console.log(this.matches2);
  }

  saveScore(idTournament, idMatch, scoreHome, scoreGuest) {
    const yo$ = this.matchService.updateMatchScore(
      idTournament,
      idMatch,
      scoreHome,
      scoreGuest
    );
    this.subs.sink = yo$.subscribe(data => data);
  }

  // finishMatch(idTournament, idMatch, deleted) {
  //   const yo$ = this.matchService.updateMatchCompleted(
  //     idTournament,
  //     idMatch,
  //     deleted
  //   );
  //   this.subs.sink = yo$.subscribe(data => data);
  // }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
