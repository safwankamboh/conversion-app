export interface Signup {
  name: string;
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}

export interface SignUpResponse {
  Id: number;
  Name: string;
  Email: string;
}
export interface LoginResponse {
  AccessToken: string;
  User: {
    Id: number;
    Name: string;
    Email: string;
  };
}
