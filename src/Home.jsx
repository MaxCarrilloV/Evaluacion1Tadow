import React, {  useState } from "react";
import "./App.css";
import { Card, CardContent, CardMedia, Grid, List, ListItem, Typography, Box, CardActions, IconButton, Tooltip, styled, Collapse, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useQueryObtenerperro } from "./Queries/queryObtenerPerro";
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
  const [rechazados, setRechazados ] = useState([])
  const [aceptados, setAceptados] = useState([])
  const [expandedAccep, setExpandedAccept] = useState(false);
  const [expandedreject, setExpandedreject] = useState(false);
  const [AcceptIndex, setAcceptIndex] = useState(-1);
  const [RejectIndex, setRejectIndex] = useState(-1);

  const ExpandAceptados = (perro) => {
    setAcceptIndex(aceptados.indexOf(perro))
    setExpandedAccept(!expandedAccep)   
  };

  const ExpandReject = (perro) => {
    setRejectIndex(rechazados.indexOf(perro))
    setExpandedreject(!expandedreject)   
  };

  const {
    data: perrito ,
    isLoading:  cargando,
    refetch: recargar,
    isError: errors,
    isRefetching: refrescargar,
  } = useQueryObtenerperro();
  


  const RechazarPerro = (perro) => {
    setRejectIndex(RejectIndex+1)
    setRechazados((rechazados) => [perro,...rechazados]);
    recargar();
  }

  const AceptarPerro = (perro) => {
    setAcceptIndex(AcceptIndex+1)
    setAceptados((aceptados) => [perro , ...aceptados ]);
    recargar();
  }

  const quitarAceptado = (perro) => {
    setExpandedAccept(false)
    setExpandedreject(false);
    let result = aceptados.filter((item) => item.name!== perro.name)
    setRechazados((rechazados) => [perro,...rechazados ]);
    setAceptados(result);
  }

  const quitarRechazado = (perro) => {
    setExpandedAccept(false)
    setExpandedreject(false);
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
            {(cargando || refrescargar) && <CircularProgress color="primary" />}
            {!cargando && !refrescargar && 
              <Card  style={{ height: 500}}>
                <CardMedia 
                    style={{ width: '100%', height: '68%', objectFit: 'cover', alignItems:"center"}}  
                    component="img" 
                    image= {perrito.image} 
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {perrito.name} 
                  </Typography>
                  <Typography gutterBottom variant="body2" component='span'>
                    {perrito.description}
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
              <Tooltip title="Rechazar Perro" arrow>
                <IconButton color="primary" onClick={() => RechazarPerro(perrito)} disabled={cargando}><CloseIcon/> </IconButton>
              </Tooltip>
              <Tooltip title="Aceptar Perro" arrow>
                <IconButton color="primary" onClick={() => AceptarPerro(perrito)} disabled={cargando}><CheckIcon/> </IconButton>
              </Tooltip> 
            </Grid>

        </Grid>

        <Grid xs={6} md={4} item >
             <List className="list">
               <h4 > Perros Aceptados</h4>
               {aceptados.map((item,index) => (
                  <ListItem key={index} >
                    
                    <Card style={{ width: "100%"}}>
                        <CardMedia 
                            style={{ width: '100%', height: 350, objectFit: 'cover', alignItems:"center"}}  
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
                                  <Tooltip title="Mover Perro" arrow>
                                    <IconButton color="primary" onClick={() => quitarAceptado(item)}><RotateLeftIcon/></IconButton>
                                  </Tooltip>
                                  
                                  <Tooltip title="Ver Descripcion Perro" arrow>
                                      <Button
                                        expand={expandedAccep}
                                        onClick={() => ExpandAceptados(item)}
                                        aria-expanded={expandedAccep}
                                        
                                      >
                                        <VisibilityIcon color="primary" />
                                      </Button>
                                  </Tooltip>
                                </CardActions>

                                {AcceptIndex === index  && <Collapse in={expandedAccep} timeout="auto" unmountOnExit>
                                    <CardContent>
                                      <Typography gutterBottom variant="body2" component='span'>
                                        {item.description}
                                      </Typography>
                                    </CardContent>
                                </Collapse>}
                                
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
                    
                    <Card style={{ width: "100%"}}>
                        <CardMedia 
                            style={{ width: '100%', height: 350, objectFit: 'cover', alignItems:"center"}}  
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
                                  <Tooltip title="Mover Perro" arrow>
                                    <IconButton color="primary" onClick={() => quitarRechazado(item)}><RotateLeftIcon/></IconButton>
                                  </Tooltip>

                                  <Tooltip title="Ver Descripcion Perro" arrow>
                                      <Button
                                        expand={expandedreject}
                                        onClick={() => ExpandReject(item)}
                                        aria-expanded={expandedreject}
                                        
                                      >
                                        <VisibilityIcon color="primary" />
                                      </Button>
                                  </Tooltip>
                                </CardActions>

                                {RejectIndex === index  && <Collapse in={expandedreject} timeout="auto" unmountOnExit>
                                    <CardContent>
                                      <Typography gutterBottom variant="body2" component='span'>
                                        {item.description}
                                      </Typography>
                                    </CardContent>
                                </Collapse>}
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