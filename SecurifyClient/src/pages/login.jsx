import { useEffect } from "react";
import styled from "styled-components";
import logotech from "../assets/logotech.png";
import logoogle from "../assets/logoogle.png";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import personas from "../assets/personas.png";

export function Login() {
  const navigate = useNavigate();
  const { user, googleSignIn } = UserAuth();

  const iniciarSesion = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container>
      <section className="imgseccion">
        <h1>Security Tech</h1>
        <div className="fondocontent">
          <img src={logotech} alt="Logo Tech" />
        </div>
        <h4>Bienvenido a tu plataforma segura para gestionar el acceso de tu colonia</h4>
      </section>
      <section className="panelsesion">
        <h2>Iniciar sesión</h2>
        <button onClick={iniciarSesion} className="btniniciar">
          <img src={logoogle} alt="Logo Google" />
          <span> Iniciar con Gmail</span>
        </button>
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 30px;
  background-color: #85bbbe;
  background-image: radial-gradient(circle at 10% 20%, #569ea2, #85bbbe, transparent 50%),
    radial-gradient(circle at 30% 40%, #569ea2, #85bbbe, transparent 50%),
    radial-gradient(circle at 50% 60%, #569ea2, #85bbbe, transparent 50%),
    radial-gradient(circle at 70% 80%, #569ea2, #85bbbe, transparent 50%);
  background-blend-mode: multiply;
  flex-direction: column;
  width: 100vw;

  .imgseccion {
    background-color: white;
    border-radius: 20px;
    padding: 70px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 40px;
    margin-top: 20px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.12);
    h1 {
      font-size: 30px;
      font-weight: 550;
    }
    h4 {
      font-weight: 400;
      font-size: 15px;
      color: #000000;
    }
    .fondocontent {
      display: flex;
      justify-content: center;
      img {
        width: 60%;
        -webkit-animation: flotar 3s ease-in-out infinite;
        animation: flotar 3s ease-in-out infinite;
      }
    }
  }

  .panelsesion {
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    background: url(${personas}) no-repeat center center;
    background-position: center 100%;
    background-size: 100%;
    padding: 100px;

    h2 {
      color: white;
      text-align: center;
      font-weight: 500;
      font-size: 32px;
    }
    .btniniciar {
      display: flex;
      align-items: center;
      gap: 12px;
      border-style: none;

      img {
        width: 29px;
        margin: 0 auto;
      }
      background-color: white;
      padding: 10px 29px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 20px;
      transition: all 0.25s ease;
      box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.12);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 20px 40px 0px rgb(0 0 0 / 10%);
        cursor: pointer;
      }
      span {
        opacity: 0.8;
      }
    }
    .social {
      gap: 20px;
      display: flex;
      justify-content: center;
      align-content: space-between;
      color: white;
      font-size: 30px;
      position: relative;
      bottom: 0;

      .icons:hover {
        transform: translateY(10px);
        transition: all 0.5s;
      }
    }
  }
  @media (min-width: 64em) {
    flex-direction: row;
    .imgseccion {
      margin-top: 0;
      width: 40%;
    }
    .panelsesion {
      width: 40%;
    }
  }
  @media (max-width: 48em) {
    .imgseccion {
      .fondocontent {
        img {
          /* width: 80%; */
        }
      }
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 20px);
    }
    100% {
      transform: translate(0, 0px);
    }
  }
`;
