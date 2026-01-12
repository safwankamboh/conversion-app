import api from "../api";

import { ApiResponse } from "../../types/responce";
import { Login, LoginResponse, Signup, SignUpResponse } from "@/types/auth";

// signup service
export const signup = async (
  req: Signup
): Promise<ApiResponse<SignUpResponse>> => {
  const response = await api.post<ApiResponse<SignUpResponse>>(
    "auth/signup",
    req
  );
  return response.data;
};
export const login = async (
  req: Login
): Promise<ApiResponse<LoginResponse>> => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "auth/login",
    req
  );
  return response.data;
};
