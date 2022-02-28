import { Context } from "../store/AppProvider";
import { useContext } from "react";
export const useGlobalState = () => {
  return useContext(Context);
};
