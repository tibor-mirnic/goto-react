import { EnumType } from "../../enum/enum-type";

export interface IContextAction<A extends typeof EnumType> {
  action: A;
  payload: any;
}