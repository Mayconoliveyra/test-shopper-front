import { api } from "../axiosConfig";
import { AxiosResponse } from "axios";

const prefix = "/price-manager";

interface IProduct {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
}
interface INewPrice {
  new_sales_price: number;
  new_cost_price_pack?: number;
}
interface IProductInvalid {
  code: number;
  msgError: string;
}
export type IProductValidation = (IProduct & INewPrice) | IProductInvalid;

const uploadFileCSV = async (
  formData: FormData,
  fileHasHeader: string,
  nameColumnCode: string,
  nameColumnNewPrice: string
): Promise<AxiosResponse<IProductValidation[]>> => {
  return await api.post(
    `${prefix}/upload-file-csv?fileHasHeader=${fileHasHeader}&nameColumnCode=${nameColumnCode}&nameColumnNewPrice=${nameColumnNewPrice}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const updatePrices = async (
  dataProducts: IProductValidation[]
): Promise<AxiosResponse<void>> => {
  return await api.put(`${prefix}/update-prices`, {
    dataProducts,
  });
};

export const PriceManagerService = {
  uploadFileCSV,
  updatePrices,
};
