import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type MethodType = "message" | "password";
export interface IMessageData {
  phone: string;
  phoneVerificationCode: string;
}
export interface IPasswordData {
  username: string;
  password: string;
  imageVerificationCode: string;
}
interface LoginState {
  method: MethodType;
  data: IMessageData | IPasswordData;
}

const initialState: LoginState = {
  method: "message",
  data: { phone: "", phoneVerificationCode: "" },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveMethod: (state: LoginState, action: PayloadAction<MethodType>) => {
      state.method = action.payload;
    },
    saveData: (
      state: LoginState,
      action: PayloadAction<IMessageData | IPasswordData>
    ) => {
      if (state.method === "message") {
        state.data = action.payload as IMessageData;
      } else {
        state.data = action.payload as IPasswordData;
      }
    },
  },
});

export const { saveData, saveMethod } = loginSlice.actions;
export const selectMethod = (state: RootState) => state.login.method;
export const selectData = (state: RootState) => state.login.data;
export default loginSlice.reducer;
