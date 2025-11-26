/* eslint-disable @typescript-eslint/no-explicit-any */
export type CustomSession = Session | any;

export interface Session {
  data: any;
  status: any;
  update: any;
}
