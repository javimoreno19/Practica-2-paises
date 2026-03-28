import { api } from "./api";

export const getCountryByName = async (name: string) => {
  const respuesta = await api.get(
    `/name/${name}?fields=name,flag,flags,region,subregion,capital,population,area,languages,currencies`
  );
  return respuesta;
};