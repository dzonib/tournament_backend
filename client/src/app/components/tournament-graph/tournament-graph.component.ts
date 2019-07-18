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

  // displayedColumnsForPlayers: string[] = [
  //   "scoreHome",
  //   "scoreGuest",
  //   "drowPosition",
  //   "phaseName"
  // ];

  // tournamentGraphGroup: FormGroup;
  // dataSourceMatches = new MatTableDataSource<any>(this.matches);
  // selectionForMatches = new SelectionModel<any>(true, []);

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private matchService: MatchService // private _formBuilder: FormBuilder
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
      // this.dataSourceMatches = new MatTableDataSource<any>(this.matches);
    });

    //
  }

  resultIncrementHandler(
    matchWithNewResult: Match,
    homeOrGuest: "home" | "guest"
  ): void {
    this.disableFinishMatchBtn = false;
    this.matches = this.matches.map(match => {
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

  resultSubtracthandler(
    matchWithNewResult: Match,
    homeOrGuest: "home" | "guest"
  ): void {
    this.disableFinishMatchBtn = false;
    this.matches = this.matches.map(match => {
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

  finishMatchHandler(match: Match) {
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

  saveScore(idTournament, id, scoreHome, scoreGuest) {
    const yo$ = this.matchService.updateMatchScore(
      idTournament,
      id,
      scoreHome,
      scoreGuest
    );

    this.subs.sink = yo$.subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
