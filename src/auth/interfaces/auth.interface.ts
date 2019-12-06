export interface User {
  readonly id: number;
  readonly name: string;
  readonly age: number;
}

export interface Login {
  readonly user: string;
  readonly password: string;
}
