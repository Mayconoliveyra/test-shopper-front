import { api } from "../axiosConfig";
import { AxiosResponse } from "axios";

const prefix = "/price-manager";

const uploadFileCSV = async (
  formData: FormData,
  fileHasHeader: string,
  nameColumnCode: string,
  nameColumnNewPrice: string
): Promise<AxiosResponse<void>> => {
  return await api.post(
    `${prefix}/upload-file-csv?fileHasHeader=${fileHasHeader}&nameColumnCode=${nameColumnCode}&nameColumnNewPrice=${nameColumnNewPrice}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const PriceManagerService = {
  uploadFileCSV,
};
