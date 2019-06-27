import { Component, OnInit } from "@angular/core";
import { TeamsService } from "../../data/services/teams.service";
import { PlayersService } from "../../data/services/players.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private teamsService: TeamsService, private playersService: PlayersService) {}

  ngOnInit() {}

  getTeams() {
    this.teamsService.getAllTeams().subscribe(teams => console.log(teams));
  }

  getAllPlayers(){
    this.playersService.getAllPlayers().subscribe(players => console.log(players));
  }
}
