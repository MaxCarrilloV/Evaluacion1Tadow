import React, { useState, Fragment, useEffect } from "react";
import { Card, CardContent, CardMedia, Grid,Container , CardActions,  Button } from "@mui/material";

import { useForm ,Controller } from "react-hook-form";
import CustomTextField from "../Components/CustomComponents/CustomTextField";
import { useMutation } from "react-query";
import {mutatePerro} from "../Queries/mutatePerro";
import {useQueryObtenerperro} from "../Queries/queryObtenerPerro";
import CircularProgress from '@mui/material/CircularProgress'
import { CustomAutocomplete } from "../Components/CustomComponents/CustomAutocomplete";

const RegistrarPerro = () => {
  const { handleSubmit,reset,control,formState: { errors },setValue} = useForm({
    defaultValues: {
       id: "", 
       nombre: "",
       foto: "",
       descripcion: "",
       sexo: ""
    },
  });
  const [perro, setperro] = useState();
  const {
    data: perrito ,
    isLoading:  cargando,
    refetch: recargar,
    isError: errores,
    isRefetching: refrescargar,
  } = useQueryObtenerperro();
  
  const onSubmit = (data) => {
        
        data.foto = perro;
        console.log("perro",data);
        mutate(data);
  };

  const guardarInfo = (data) => {
    console.log('perro',data);
    mutate(data);
    setPerro(data);
  };
 
 
  const { mutate} = useMutation(mutatePerro, {
    onSuccess: (response) => {
    
     console.log('Creado correctamente');
    },
    onError: (error) => {
     console.log('Hubo un error');
    },
  });
  const GuardarPerro = (perro) =>{
    setperro(perrito.message)
  }
  const SolicitarPerro = (perro) => {
    setperro(perrito.message)
    recargar();
  }

  return (
    <Container>
     
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        
        <Grid item md={12} xs={12} sx={{ mb: 5, mt:5 }}>
            
          <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
            
            <Card sx={{ p: 1 }}>
              <h1>
                Registrar Perro
              </h1>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >

                <Grid  item justifyItems="center" justifyContent="center" >
                {(cargando || refrescargar) && <CircularProgress color="primary" />}
                {!cargando && !refrescargar && 
                <Card  style={{ height: 300, width: 280}}>
                    <CardMedia 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', alignItems:"center"}}  
                        component="img" 
                        image= {perrito.message} 
                        
                    />
                    
                     
                </Card>
                
                }
                <Button color="primary" onClick={() => SolicitarPerro(perrito)} disabled={cargando}>Solicitar nueva Foto</Button>
                <Button color="primary" onClick={() => GuardarPerro(perrito)} disabled={cargando}>Guardar foto</Button>
                </Grid>
                <Grid item md={4}>
                  <CustomTextField
                      name="foto"
                      label="foto"
                      control={control}
                      value={perro}
                      onchage={e => {setValue('foto', e.target.value); setPerro(e.target.value)} }
                      type="text"
                    
                  />


                  <CustomTextField
                  name="nombre"
                  label="nombre"
                  control={control}
                  type="text"
                  
                  />

                  <CustomTextField
                  name="descripcion"
                  label="descripcion"
                  control={control}
                  type="text"
                     
                  />

                <CustomTextField
                    name="sexo"
                    label="sexo perro"
                    type="text"
                    control={control}
                  />
                  
                  <CardActions>
                    <Button
                      id="terminar_registro"
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                      sx={{ r: 0 }}
                    >
                      Registrar Perro
                    </Button>
                </CardActions>
                </Grid>
                
              </Grid>
              
            </Card>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
export default RegistrarPerro;