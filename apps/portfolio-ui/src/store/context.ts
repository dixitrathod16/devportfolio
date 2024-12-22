import React from "react";
import { Context } from "../types/interfaces";
export const StyleContext = React.createContext<Context>({});
export const GithubProfileContext = React.createContext<any>({});

export const StyleProvider = StyleContext.Provider;
export const StyleConsumer = StyleContext.Consumer;
export const GithubProfileProvider = GithubProfileContext.Provider;
export const GithubProfileConsumer = GithubProfileContext.Consumer;