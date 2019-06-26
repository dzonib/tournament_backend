import { Component, OnInit } from "@angular/core";
import { TeamsService } from "src/app/data/services/teams.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private teamsService: TeamsService) {}

  ngOnInit() {}

  getTeams() {
    this.teamsService.getAllTeams().subscribe(teams => console.log(teams));
  }
}
