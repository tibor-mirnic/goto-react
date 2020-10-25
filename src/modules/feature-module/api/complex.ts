// import axios-async

import Axios from "axios";
import { IGetComplexModelRequest } from "../models/request/get-complex-model";
import { IGetComplexModelResponse } from "../models/response/get-compolex-model";

const axios: any = {
  getAsync: () => {}
};

export const getComplexModel = async (request: IGetComplexModelRequest): Promise<IGetComplexModelResponse> => {
  try {
    const response = await axios.getAsync({
      url: 'tibor',
      queryParams: {
        id: request.id
      }
    });

    return response as IGetComplexModelResponse;
  }
  catch (error) {
    throw error;
  }
}