import React from "react";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "../router";
import { UsuarioProvider } from "./context/usuarioContext";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsuarioProvider> 
          <BrowserRouter>
            <RouterApp />
          </BrowserRouter>
        </UsuarioProvider>
    </QueryClientProvider>
  );
}

export default App;
