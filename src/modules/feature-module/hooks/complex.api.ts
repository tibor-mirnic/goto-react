import { useAxios } from "src/common/axios";

import { GetComplexModel, IComplexApi } from "../models/hooks/complex";
import { IGetComplexModelResponse } from "../models/response/get-compolex-model";

export const useComplexApi = (baseUrl: string): IComplexApi => {
  const { get } = useAxios();

  const getComplexModel: GetComplexModel = async (request, cancelationToken) => {
    try {
      const response = await get<IGetComplexModelResponse>({
        resourcePath: `${baseUrl}/comments`,
        queryParams: {
          postId: request.id
        },
        cancelationToken: cancelationToken
      });
  
      return response;
    }
    catch (error) {
      throw error;
    }
  }

  return {
    getComplexModel
  }
}