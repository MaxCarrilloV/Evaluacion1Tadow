import { Route, Routes } from "react-router-dom";
import Home from "./src/Home";
import CustomToolbar from "./src/Components/Drawer";


import { useUsuario } from "./src/context/usuarioContext";
import Login from "./src/Pages/Login";
import RegistrarPerro from "./src/Pages/RegistrarPerro";

const RouterApp = () => {
  const { usuario } = useUsuario();

  return !usuario ? <LogedInRoutes /> : <NotLogedRoutes />;
};


 const NotLogedRoutes = () => {
   return (
     <Routes>
       <Route exact path="/login" element={<Login />} />    
     </Routes>
);
};
const LogedInRoutes = () => {
  return (
    <>
    <CustomToolbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registrar" element={<RegistrarPerro />} />
      </Routes>
    </>
  );
};
export default RouterApp;