import React from "react";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import Admin from "../pages/Administrator/admin"; // Asegúrate de que la ruta sea correcta
import Visitor from "../pages/visitor/visitor";
import ResidentAdmin from "./residentAdmin/residentadmin";
import Resident from "../pages/resident/resident"
import Vigilant from "./vigilant/vigilant";

export function Home() {
  const { user, role, logOut } = UserAuth();

  const cerrarSesión = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      

      {role === "admin" && <Admin />}
      {role === "visitor" && <Visitor/>}
      {role === "vigilant" && <Vigilant/>}
      {role === "residentadmin" && <ResidentAdmin/>}
      {role === "resident" && <Resident/>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  padding-right: 50px; /* Ajusta el espaciado a la derecha según sea necesario */
`;


