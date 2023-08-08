import React from "react";
import {
  Button,
  Card,
  CardActions,
  Container,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CustomTexField from "../Components/CustomComponents/CustomTextField"
import { useUsuario } from "../context/usuarioContext";

const Login = () => {
  const {
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

const {
    loginUsuario
  } = useUsuario();

  const onSubmit = (data) => {
    console.log("data", data);
    loginUsuario(data);
  };

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={12} xs={12} sx={{ mb: 5 }}>
          <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ p: 1 }}>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <CustomTexField
                    label="Correo"
                    name="email"
                    type="text"
                    control={control}
                  />
                </Grid>
                <Grid item md={4}>
                  <CustomTexField
                    name="password"
                    label="contraseña"
                    type="password"
                    control={control}
                  />
                </Grid>
              </Grid>
              <CardActions>
                <Button
                  id="terminar_registro"
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ r: 0 }}
                >
                  Iniciar Sesión
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Login;