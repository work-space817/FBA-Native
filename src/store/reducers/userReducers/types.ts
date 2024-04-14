export interface IAuthUser {
  isAuth: boolean;
}
export enum AuthUserActionType {
  LOGIN_USER = "AUTH_LOGIN_USER",
  LOGOUT_USER = "AUTH_LOGOUT_USER",
}

export interface IUserBalance {
  userBalance: number;
  isUpdatedBalance: boolean;
}
export enum UserBalanceActionType {
  SET_BALANCE = "SET_BALANCE",
  UPDATE_BALANCE = "UPDATE_BALANCE",
}
