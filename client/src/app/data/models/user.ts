// enum Category {
//   admin,
//   judge,
//   employee,
//   anonymous
// }

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  category: string;
  bannerUrl: string;
  registrated: boolean;
  deleted: boolean;
}
