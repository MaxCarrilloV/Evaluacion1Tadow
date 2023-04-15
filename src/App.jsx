import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import { Card, CardContent, CardMedia, Grid, List, ListItem, Typography, Box } from "@mui/material";


function App() {
 
  const [perrito, setPerrito] = useState({name:"", image:""})
  const [recarga, setRecarga] = useState(false);
  const [rechazados, setRechazados ] = useState([])
  const [aceptados, setAceptados] = useState([])


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
  }

  const RechazarPerro = (perro) => {
    setRechazados((rechazados) => [...rechazados , perro]);
    obtnerPerro();
  }

  const AceptarPerro = (perro) => {
    setAceptados((aceptados) => [perro,...aceptados]);
    obtnerPerro();
  }

  useEffect(() => {
    obtnerPerro();
  }, []);
  
  return (
    <div className="App">
      <Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item>
             <h4 > Perros Aceptados</h4>
             <List >
               {aceptados.map((item,index) => (
                  <ListItem kay={index} >
                    
                    <Card style={{ width: 350, height: 350}}>
                        <CardMedia 
                            style={{ width: '100%', height: '88%', objectFit: 'cover', alignItems:"center"}}  
                            component="img" 
                            image= {item.image} 
                        />
                        <CardContent >
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name} 
                          </Typography>
                        </CardContent> 
                      </Card>    
                  </ListItem>
               ))}
            </List>
        </Grid>


        <Grid item>
        {recarga && <p>Cargando perrito</p>}
            {!recarga && perrito && 
              <Card style={{ width: 350, height: 350}}>
                <CardMedia 
                    style={{ width: '100%', height: '88%', objectFit: 'cover', alignItems:"center"}}  
                    component="img" 
                    image= {perrito.image} 
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {perrito.name} 
                  </Typography>
                </CardContent> 
              </Card>
            }
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <button onClick={() => RechazarPerro(perrito)} disabled={recarga}>Rechazado </button>
              <button onClick={() => AceptarPerro(perrito)} disabled={recarga}>Aceptado </button>
            </Grid>

        </Grid>

        <Grid item>
             <h4> Perros Rechazados</h4>
             <List >
               {rechazados.map((item,index) => (
                  <ListItem kay={index} >
                    
                    <Card style={{ width: 350, height: 350}}>
                        <CardMedia 
                            style={{ width: '100%', height: '88%', objectFit: 'cover', alignItems:"center"}}  
                            component="img" 
                            image= {item.image} 
                        />
                        <CardContent >
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name} 
                          </Typography>
                        </CardContent> 
                      </Card>    
                  </ListItem>
               ))}
            </List>
        </Grid>
      </Grid>
      </Box>
            

            
    </div>
    
  )
}

export default App
