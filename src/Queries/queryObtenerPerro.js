import { useQuery } from "react-query";
import axios from "axios";
import { loremIpsum } from "lorem-ipsum";

const description = () =>
{
  return loremIpsum({
    count: 1,                      // número de párrafos a generar
    units: 'paragraphs',           // unidades (párrafos, palabras, etc.)
    sentenceLowerBound: 5,        // límite inferior de la longitud de la oración
    sentenceUpperBound: 10,       // límite superior de la longitud de la oración
    paragraphLowerBound: 3,       // límite inferior de la longitud del párrafo
    paragraphUpperBound: 7,       // límite superior de la longitud del párrafo
    format: 'plain',              // formato de salida (html, markdown, etc.)
  });
} 


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
    let perrito = {name:"", image:"", description:""}
    let urlBase = "https://dog.ceo/api/breeds/image/random";
    const { data } = await axios.get(urlBase);
    perrito.image = data.message
    perrito.name = obtnerNombrePerro();
    perrito.description = description();
    return perrito;

}