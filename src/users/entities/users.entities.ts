export class Users {
  id?: BigInt | number;
  email?: string;
  password?: string;
  name?: string;
  sex?: string;
  birth?: string;
  postalCode?: string;
  address?: string;
  detailAddress?: string;
  phone?: string;
  auth?: string;
  createAt?: Date;
  updateAt?: Date;
  lastLoginAt?: Date;
}

export class Logs {
  logId?: BigInt;
  status?: string;
  time?: Date;
  userId?: BigInt;
}
