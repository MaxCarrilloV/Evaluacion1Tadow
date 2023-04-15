import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import { Card, CardMedia } from "@mui/material";

function App() {
 
  const [perrito, setPerrito] = useState({name:"", image:""})
  const [recarga, setRecarga] = useState(false);

  const obtnerNombrePerro = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const obtnerPerro =  () => {
    setRecarga(true);
    const result = obtnerNombrePerro()
    axios
    .get("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      setPerrito({name :result , image:  response.data.message})
      setRecarga(false)
    })
    .catch(error => {
      console.error(error);
      setRecarga(false)
    });
    console.log(perrito);
    
  }

  useEffect(() => {
    obtnerPerro();
  }, []);
  
  return (
    <div className="App">
      {recarga && <p>Cargando perrito</p>}
      {!recarga && perrito && 
      <Card>
        <CardMedia component="img" image= {perrito.image}>

        </CardMedia>
       
      </Card>}
      <button onClick={obtnerPerro}>Rechazado </button>
      <button onClick={obtnerPerro}>Aceptado </button>
    </div>
  )
}

export default App
