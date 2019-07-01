import { Component, OnInit, OnDestroy } from "@angular/core";

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { SubSink } from "subsink";
import { SelectionModel } from "@angular/cdk/collections";

import { MatTableDataSource } from "@angular/material/table";

import { User } from "../../data/models/user";

import { Store } from "@ngrx/store";
import { GetAllPlayers, GetAllTeams } from "../../data/stores/main-store";
import { State } from "../../data/stores/main-store/state";
import { selectAllPlayers } from "../../data/stores/main-store/selectors";

import { Team } from "src/app/data/models/team";
import { Util } from "src/app/data/models/util";
import { selectAllTeams } from "src/app/data/stores/main-store/selectors";

import * as jwt_decode from "jwt-decode";
import { TournamentService } from "src/app/data/services/tournament.service";

@Component({
  selector: "app-tournament-form",
  templateUrl: "./tournament-form.component.html",
  styleUrls: ["./tournament-form.component.css"]
})
export class TournamentFormComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  players: User[];

  selectedTeams: Team[];
  numberOfParticipantsVal: number;
  tournamentStatusVal: string;

  displayedColumnsForPlayers: string[] = [
    "select",
    "position",
    "name",
    "surname",
    "username"
  ];

  numberOfParticipants: Util[] = [
    { key: 2, value: 2 },
    { key: 4, value: 4 },
    { key: 8, value: 8 },
    { key: 16, value: 16 },
    { key: 32, value: 32 }
  ];

  leagues: any[] = [
    { value: 1, key: "Ligue 1 Conforama" },
    { value: 2, key: "Other European Leagues" },
    { value: 3, key: "English 2nd Division" },
    { value: 4, key: "English League" },
    { value: 5, key: "Campeonato Nacional Scotiabank" },
    { value: 6, key: "Jupiler Pro League" },
    { value: 7, key: "Asia-Oceania" },
    { value: 8, key: "South America" },
    { value: 9, key: "Russian Premier Liga" },
    { value: 10, key: "Italian League" },
    { value: 11, key: "Africa" },
    { value: 12, key: "Spanish League" },
    { value: 13, key: "Ladbrokes Premiership" },
    { value: 14, key: "AFC Champions League" },
    { value: 15, key: "Spor Toto Süper Lig" },
    { value: 16, key: "Superliga" },
    { value: 17, key: "North & Central America" },
    { value: 18, key: "Europe" },
    { value: 19, key: "Superliga Quilmes Clásica" },
    { value: 20, key: "Liga NOS" },
    { value: 21, key: "Other Latin American Teams" },
    { value: 22, key: "Eredivisie" },
    { value: 23, key: "CAMPEONATO BRASILEIRO" },
    { value: 24, key: "Domino's Ligue 2" },
    { value: 25, key: "Raiffeisen Super League" }
  ];

  dataSourcePlayers = new MatTableDataSource<any>(this.players);
  selectionForPlayers = new SelectionModel<any>(true, []);

  league: string;
  teams: Team[];
  teamsToShow: Team[];
  displayedColumns: string[] = ["select", "name", "banner", "league"];
  dataSource = new MatTableDataSource<any>(this.teamsToShow);
  selection = new SelectionModel<Team>(true, []);

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  numberFormControl: FormControl;
  nameOfTournament: FormControl;
  leagueFormControl: FormControl;
  //beginDate = new FormControl(new Date());
  beginDate: FormControl;

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<State>,
    private tournamentService: TournamentService
  ) {
    this.numberFormControl = new FormControl("", [Validators.required]);
    this.nameOfTournament = new FormControl("", [Validators.required]);
    this.beginDate = new FormControl(new Date(), [Validators.required]);
    // this.beginDate = new FormControl('', [Validators.required]);
    this.thirdFormGroup = this._formBuilder.group({
      numberFormControl: this.numberFormControl,
      nameOfTournament: this.nameOfTournament,
      beginDate: this.beginDate
    });

    this.leagueFormControl = new FormControl("", [Validators.required]);
    this.firstFormGroup = this._formBuilder.group({
      leagueFormControl: this.numberFormControl
    });
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });

    //GET PLAYERS

    this.store.dispatch(new GetAllPlayers());

    this.subs.sink = this.store.select(selectAllPlayers).subscribe(data => {
      this.players = data;
      this.dataSourcePlayers = new MatTableDataSource<any>(this.players);

      this.store.dispatch(new GetAllTeams());
      this.subs.sink = this.store.select(selectAllTeams).subscribe(teams => {
        this.teams = teams;
        // this.dataSource = new MatTableDataSource(teams); if you want all teams to show
      });
    });
  }

  numberOfPlayersSelectionChange(event) {
    console.log(event.value);
    this.numberOfParticipantsVal = event.value;
    if (this.numberOfParticipantsVal === 2) {
      this.tournamentStatusVal = "finale";
      console.log(this.tournamentStatusVal);
    } else if (this.numberOfParticipantsVal === 4) {
      this.tournamentStatusVal = "semi-finals";
      console.log(this.tournamentStatusVal);
    } else if (this.numberOfParticipantsVal === 8) {
      this.tournamentStatusVal = "quarter-finals";
      console.log(this.tournamentStatusVal);
    } else if (this.numberOfParticipantsVal === 16) {
      this.tournamentStatusVal = "8th-finals";
      console.log(this.tournamentStatusVal);
    } else if (this.numberOfParticipantsVal === 32) {
      this.tournamentStatusVal = "16th-finals";
      console.log(this.tournamentStatusVal);
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelectedPlayers() {
    const numSelected = this.selectionForPlayers.selected.length;
    const numRows = this.dataSourcePlayers.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterTogglePlayers() {
    this.isAllSelectedPlayers()
      ? this.selectionForPlayers.clear()
      : this.dataSourcePlayers.data.forEach(row =>
          this.selectionForPlayers.select(row)
        );
  }

  /** The label for the checkbox on the passed row */

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id
    }`;
  }
  checkboxLabelPlayers(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedPlayers() ? "select" : "deselect"} all`;
    }
    return `${
      this.selectionForPlayers.isSelected(row) ? "deselect" : "select"
    } row ${row.id}`;
  }

  leagueSelection(e) {
    this.teamsToShow = this.teams.filter(team => team.leagueName === e.value);
    this.dataSource = new MatTableDataSource<any>(this.teamsToShow);
    // this.selection = new SelectionModel<Team>(true, []);
    // console.log(this.selection.selected);
  }

  removeTeam(team) {
    this.selection.deselect(team);
    // console.log(this.selection);
    // .selected = this.selection.selected.filter((team) => team.id !== id)
  }

  removeUser(user) {
    console.log(user);
    this.selectionForPlayers.deselect(user);
  }

  createTournament() {
    // console.log(this.numberFormControl.value);
    // console.log(this.beginDate.value);
    // console.log(this.nameOfTournament.value);
    this.tournamentService
      .createTournament({
        name: this.nameOfTournament.value,
        numberOfPlayers: this.numberFormControl.value,
        beginDate: this.beginDate.value
      })
      .subscribe(data => console.log("RESPONSE", data));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

// numberOfParticipants
// beginDate
// nameOfTournament
