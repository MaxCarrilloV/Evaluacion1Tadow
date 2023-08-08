import { useQuery } from "react-query";
import axios from "axios";

export function useQueryObtenerperro() {
  
  return useQuery("ObtenerperroQuery", ObtenerperroQuery, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });
}

export const ObtenerperroQuery = async () => {
  
    let urlBase = "https://dog.ceo/api/breeds/image/random";
    const { data } = await axios.get(urlBase);
    return data;

}