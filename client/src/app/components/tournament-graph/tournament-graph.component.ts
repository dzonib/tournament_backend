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

@Component({
  selector: "app-tournament-graph",
  templateUrl: "./tournament-graph.component.html",
  styleUrls: ["./tournament-graph.component.css"]
})
export class TournamentGraphComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  tournamentId: number = 0;
  matches: Match[] = [];

  displayedColumnsForPlayers: string[] = [
    "scoreHome",
    "scoreGuest",
    "drowPosition",
    "phaseName"
  ];

  tournamentGraphGroup: FormGroup;
  dataSourceMatches = new MatTableDataSource<any>(this.matches);
  selectionForMatches = new SelectionModel<any>(true, []);

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this.tournamentGraphGroup = this._formBuilder.group({});
  }

  ngOnInit() {
    this.subs.sink = this.route.params.subscribe((params: Params) => {
      console.log("PARAMS ID", params.id);
      this.tournamentId = params.id;
    });
    //GET MATCHES
    this.store.dispatch(new GetAllMatches(this.tournamentId));
    this.subs.sink = this.store.select(selectAllMatches).subscribe(data => {
      this.matches = data;
      this.dataSourceMatches = new MatTableDataSource<any>(this.matches);
    });

    //
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
