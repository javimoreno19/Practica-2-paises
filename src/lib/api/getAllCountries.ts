import { api } from "./api";

export const getAllCountries = async () => {
  const respuesta = await api.get("/all?fields=name,flag,flags,region");
  return respuesta;
};