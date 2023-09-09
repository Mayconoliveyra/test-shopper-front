import { api } from "../axiosConfig";
import { AxiosResponse } from "axios";

const prefix = "/price-manager";

export interface IProduto {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
  id: number;
  pack_id: number;
  product_id: number;
  qty: number;
  new_sales_price: number;
  msgError: string | null;
}

const uploadFileCSV = async (
  formData: FormData,
  fileHasHeader: string,
  nameColumnCode: string,
  nameColumnNewPrice: string
): Promise<AxiosResponse<IProduto[]>> => {
  return await api.post(
    `${prefix}/upload-file-csv?fileHasHeader=${fileHasHeader}&nameColumnCode=${nameColumnCode}&nameColumnNewPrice=${nameColumnNewPrice}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const updatePrices = async (
  dataProducts: IProduto[]
): Promise<AxiosResponse<void>> => {
  return await api.put(`${prefix}/update-prices`, {
    dataProducts,
  });
};

export const PriceManagerService = {
  uploadFileCSV,
  updatePrices,
};
