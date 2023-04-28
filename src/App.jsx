import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import { Card, CardContent, CardMedia, Grid, List, ListItem, Typography, Box, CardActions, IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    setRechazados((rechazados) => [perro,...rechazados]);
    obtnerPerro();
  }

  const AceptarPerro = (perro) => {
    setAceptados((aceptados) => [perro , ...aceptados ]);
    obtnerPerro();
  }

  const quitarAceptado = (perro) => {
    console.log(perro);
    let result = aceptados.filter((item) => item.name!== perro.name)
    setRechazados((rechazados) => [perro,...rechazados ]);
    setAceptados(result);
  }

  const quitarRechazado = (perro) => {
    console.log(perro);
    let result = rechazados.filter((item) => item.name!== perro.name)
    setAceptados((aceptados) => [perro,...aceptados ]);
    setRechazados(result);
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
        <Grid item justifyItems="center" justifyContent="center" >
        {recarga && <p>Cargando perrito</p>}
            {!recarga && perrito && 
              <Card style={{ width: 350, height: 400}}>
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
              <Tooltip title="Rechazar Perro">
                <IconButton color="primary" onClick={() => RechazarPerro(perrito)} disabled={recarga}><CloseIcon/> </IconButton>
              </Tooltip>
              <Tooltip title="Aceptar Perro">
                <IconButton color="primary" onClick={() => AceptarPerro(perrito)} disabled={recarga}><CheckIcon/> </IconButton>
              </Tooltip> 
            </Grid>

        </Grid>

        <Grid item >
             <List className="list">
               <h4 > Perros Aceptados</h4>
               {aceptados.map((item,index) => (
                  <ListItem key={index} >
                    
                    <Card style={{ width: 300, height: 350}}>
                        <CardMedia 
                            style={{ width: '100%', height: '84%', objectFit: 'cover', alignItems:"center"}}  
                            component="img" 
                            image= {item.image} 
                        />
                        <Box>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            > 
                                <CardContent >
                                  <Typography gutterBottom variant="h5" component="h3">
                                      {item.name} 
                                  </Typography>
                                  
                                </CardContent> 

                                <CardActions>
                                  <Tooltip title="Mover Perro">
                                    <IconButton color="primary" onClick={() => quitarAceptado(item)}><RotateLeftIcon/></IconButton>
                                  </Tooltip>
                                  <Tooltip title="Ver Descripcion Perro">
                                    <IconButton color="primary"><VisibilityIcon/></IconButton>
                                  </Tooltip>

                                </CardActions>
                            </Grid>

                        </Box>
                        
                        
                      </Card>    
                  </ListItem>
               ))}
            </List>
        </Grid>

        <Grid item >
             <List className="list">
               <h4> Perros Rechazados</h4>
               {rechazados.map((item,index) => (
                  <ListItem key={index} >
                    
                    <Card style={{ width: 300, height: 350}}>
                        <CardMedia 
                            style={{ width: '100%', height: '84%', objectFit: 'cover', alignItems:"center"}}  
                            component="img" 
                            image= {item.image} 
                        />
                        <Box>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            > 
                                <CardContent >
                                  <Typography gutterBottom variant="h5" component="h3">
                                      {item.name} 
                                  </Typography>
                                  
                                </CardContent> 

                                <CardActions>
                                  <Tooltip title="Mover Perro">
                                    <IconButton color="primary" onClick={() => quitarRechazado(item)}><RotateLeftIcon/></IconButton>
                                  </Tooltip>
                                  <Tooltip title="Ver Descripcion Perro">
                                    <IconButton color="primary"><VisibilityIcon/></IconButton>
                                  </Tooltip>
                                </CardActions>
                            </Grid>

                        </Box>
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
