enum Category {
  admin,
  judge,
  employee,
  anonymous
}

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  category: Category;
  bannerUrl: string;
  registrated: boolean;
  deleted: boolean;
}
