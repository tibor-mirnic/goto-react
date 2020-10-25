import { Context, Reducer } from "react";

import { EnumType } from "../../enum/enum-type";
import { IContextAction } from "./action";
import { IReducerContext } from "./reducer";

export interface IContextProps<T, A extends typeof EnumType> {
  stateContext: Context<T | null>;
  state: T;
  reducerContext: Context<IReducerContext<A> | null>;
  reducer: Reducer<T, IContextAction<A>>;
}