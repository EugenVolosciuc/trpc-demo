import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { RouterOutputs } from "./api";

export type AuthedUser = RouterOutputs["user"]["login"] | null;

export const userContext = createContext<{
  user: AuthedUser;
  setUser: Dispatch<SetStateAction<AuthedUser>>;
}>({ user: null, setUser: () => null });

export const UserProvider = userContext.Provider;

export const useAuthedUser = () => useContext(userContext);
