import { User } from "./user";

export interface Match {
  id: number;
  scoreHome?: number;
  scoreGuest?: number;
  drowPosition: number;
  phaseName: string;
  idHomeTeam?: number;
  idGuestTeam?: number;
  idTournament: number;
  idHomeUser?: number;
  idGuestUser?: number;
  homeUser?: {
    name: string;
  };
  guestUser?: {
    name: string;
  };
  homeTeam?: {
    name: string;
  };
  guestTeam?: {
    name: string;
  };
}
