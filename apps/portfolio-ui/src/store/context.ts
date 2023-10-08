import React from "react";
import { Context } from "../types/interfaces";
const StyleContext = React.createContext<Context>({});

export const StyleProvider = StyleContext.Provider;
export const StyleConsumer = StyleContext.Consumer;

export default StyleContext;