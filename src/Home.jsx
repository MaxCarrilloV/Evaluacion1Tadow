import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, CardContent, CardMedia, Grid, List, ListItem, Typography, Box, CardActions, IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useQueryObtenerperro } from "./Queries/queryObtenerPerro";

function Home() {

  const [rechazados, setRechazados ] = useState([])
  const [aceptados, setAceptados] = useState([])
  
  const {
    data: perrito ,
    isLoading:  cargando,
    refetch: recargar,
    isError: errors,
    isRefetching: refrescargar,
  } = useQueryObtenerperro();
  


  const RechazarPerro = (perro) => {
    console.log(cargando);
    setRechazados((rechazados) => [perro,...rechazados]);
    recargar();
    
  }

  const AceptarPerro = (perro) => {

    setAceptados((aceptados) => [perro , ...aceptados ]);
    recargar();
  }

  const quitarAceptado = (perro) => {
    let result = aceptados.filter((item) => item.name!== perro.name)
    setRechazados((rechazados) => [perro,...rechazados ]);
    setAceptados(result);
  }

  const quitarRechazado = (perro) => {
    let result = rechazados.filter((item) => item.name!== perro.name)
    setAceptados((aceptados) => [perro,...aceptados ]);
    setRechazados(result);
  }
  
  return (
      <Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={7}
      >
        <Grid  xs={12} sm={12} md={4} item justifyItems="center" justifyContent="center" >
            {(cargando || refrescargar) && <p>Cargando perrito</p>}
            {!cargando && !refrescargar && 
              <Card  style={{ height: 400}}>
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
              item
              xs={12} sm={12} md={12}
            >
              <Tooltip title="Rechazar Perro">
                <IconButton color="primary" onClick={() => RechazarPerro(perrito)} disabled={cargando}><CloseIcon/> </IconButton>
              </Tooltip>
              <Tooltip title="Aceptar Perro">
                <IconButton color="primary" onClick={() => AceptarPerro(perrito)} disabled={cargando}><CheckIcon/> </IconButton>
              </Tooltip> 
            </Grid>

        </Grid>

        <Grid xs={6} md={4} item >
             <List className="list">
               <h4 > Perros Aceptados</h4>
               {aceptados.map((item,index) => (
                  <ListItem key={index} >
                    
                    <Card style={{ width: "100%", height: 350}}>
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

        <Grid xs={6} md={4} item >
             <List className="list">
               <h4> Perros Rechazados</h4>
               {rechazados.map((item,index) => (
                  <ListItem key={index} >
                    
                    <Card style={{ width: "100%", height: 350}}>
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
    
  )
}

export default Home