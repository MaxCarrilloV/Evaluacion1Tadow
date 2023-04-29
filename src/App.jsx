
import React from "react";
import "./App.css";

import Home from "./Home";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home></Home>
      <p>hola</p>
    </QueryClientProvider>
  );
}

export default App;
