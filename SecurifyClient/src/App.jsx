import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { MyRoutes } from "./routers/routes";
import { DataProvider } from "./context/DataContext"; // Importar DataProvider

const Container = styled.div`
  // tus estilos aquí
`;

function App() {
  return (
    <AuthContextProvider>
      <DataProvider> 
        <Container>
          <MyRoutes />
        </Container>
      </DataProvider>
    </AuthContextProvider>
  );
}

export default App;

