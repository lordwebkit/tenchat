export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface AuthResponseError {
  data: AuthDataError;
}

export interface AuthDataError {
  message: string;
}

export interface AuthUserError {
  data: AuthDataError | null;
  error: boolean;
}
