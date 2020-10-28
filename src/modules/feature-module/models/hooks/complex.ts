import { HttpRequestMethod } from "src/common/axios";
import { IGetComplexModelRequest } from "../request/get-complex-model";
import { IGetComplexModelResponse } from "../response/get-compolex-model";

export type GetComplexModel = HttpRequestMethod<IGetComplexModelRequest, IGetComplexModelResponse>;

export interface IComplexApi {
  getComplexModel: GetComplexModel
}