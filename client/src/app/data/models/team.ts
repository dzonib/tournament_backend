export interface Team {
  id: number;
  name: string;
  country: string | null;
  bannerUrl: string;
  leagueName: string;
  deleted?: boolean;
}
