export interface IAuthRequestBody {
  email: string;
  password: string;
}

export interface IAccessTokenData {
  accessToken: string;
}

export interface IAuthJobSuccess {
  success: boolean;
}
