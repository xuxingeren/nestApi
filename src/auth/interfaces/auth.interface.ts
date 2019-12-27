export interface User {
  readonly uid: number;
  readonly user: string;
}

export interface Login {
  readonly user: string;
  readonly password: string;
}

export interface Register {
  readonly user: string;
  readonly password: string;
}

export interface Payload {
  readonly uid: number;
  readonly user: string;
  readonly type: string | string[];
}
