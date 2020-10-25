import { Context, Reducer } from "react";

export interface IModuleProps<S> {
  context: Context<any>;
  getInitialState: () => S;
  getReducer: () => Reducer<S, any>
}