import { Context } from "../store/AuthProvider";
import { useContext } from "react";
export const useAuth = () => {
  return useContext(Context);
};
