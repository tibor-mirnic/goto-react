import { Dispatch } from "react";

import { EnumType } from "../../enum/enum-type";
import { IContextAction } from "./action";

export interface IReducerContext<A extends typeof EnumType> {
  dispatch: Dispatch<IContextAction<A>>;
}