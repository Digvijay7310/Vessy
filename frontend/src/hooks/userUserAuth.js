import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext";

export const useUserAuth = () => useContext(UserAuthContext);
