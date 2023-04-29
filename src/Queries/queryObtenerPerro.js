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
    const obtnerNombrePerro = () => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
    
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    let perrito = {name:"", image:""}
    let urlBase = "https://dog.ceo/api/breeds/image/random";
    const { data } = await axios.get(urlBase);
    perrito.image = data.message
    perrito.name = obtnerNombrePerro();

    return perrito;

}