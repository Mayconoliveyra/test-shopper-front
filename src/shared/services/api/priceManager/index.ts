import { api } from "../axiosConfig";
import { AxiosResponse } from "axios";

const prefix = "price-manager";

const uploadFileCSV = async (
  formData: FormData
): Promise<AxiosResponse<void>> => {
  return await api.post(`${prefix}/upload-file-csv`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const PriceManagerService = {
  uploadFileCSV,
};
