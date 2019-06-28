
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';

import { SelectionModel } from '@angular/cdk/collections';

import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import * as jwt_decode from "jwt-decode";


import { User } from '../../data/models/user';

import { Store } from '@ngrx/store';
import {
  GetAllPlayers,
  GetAllTeams,
  GetAllTeamsSuccess,
  SetUser
} from "../../data/stores/main-store";
import { State } from "../../data/stores/main-store/state";
import { selectAllPlayers } from "../../data/stores/main-store/selectors";


import { Team } from 'src/app/data/models/team';
import { Util } from 'src/app/data/models/util';
import { selectAllTeams } from 'src/app/data/stores/main-store/selectors';

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {
  players: User[];

  displayedColumnsForPlayers: string[] = [
    'select',
    'position',
    'name',
    'surname',
    'username'
  ];

  numberOfParticipants: Util[] = [
    { key: 2, value: 2 },
    { key: 4, value: 4 },
    { key: 8, value: 8 },
    { key: 16, value: 16 },
    { key: 32, value: 32 }
  ];

  dataSourcePlayers = new MatTableDataSource<any>(this.players);
  selectionForPlayers = new SelectionModel<User[]>(true, []);

  league: string;
  teams: Team[];
  displayedColumns: string[] = ['select', 'name', 'banner', 'league'];
  dataSource = new MatTableDataSource<any>(this.teams);
  selection = new SelectionModel<Team>(true, []);

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  numberFormControl: FormControl;

  constructor(private _formBuilder: FormBuilder, private store: Store<State>) {

    this.numberFormControl = new FormControl("", [Validators.required]);
    this.thirdFormGroup = this._formBuilder.group({numberFormControl: this.numberFormControl});
  }

  ngOnInit() {

    // check if there is token i ls and set user if there is
    // CHECK IF THERE IS BETTER WAY!! need to do this on every protected route -.-
    const token = localStorage.getItem("token");

    if (token) {
      console.log("ASDASDASDASDSADASDASDSD")
      const user = jwt_decode(token);
      this.store.dispatch(new SetUser(user));
    }
// --------------------------------------------------------------------------

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    //this.thirdFormGroup = this._formBuilder.group({numberFormControl: this.numberFormControl});

    //GET PLAYERS

    this.store.dispatch(new GetAllPlayers());
    this.store.select(selectAllPlayers).subscribe(data => {
      this.players = data;
      this.dataSourcePlayers = new MatTableDataSource<any>(this.players);

      this.store.dispatch(new GetAllTeams());
      this.store.select(selectAllTeams).subscribe(teams => {
        this.teams = teams;
        this.dataSource = new MatTableDataSource(this.teams);
      });
    });
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
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }
  checkboxLabelPlayers(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedPlayers() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selectionForPlayers.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id}`;
  }
}
