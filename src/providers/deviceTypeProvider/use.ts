import { useContext } from "react";
import { displaySizeContext } from "./context";

export const useDisplaySize = () => useContext(displaySizeContext);
