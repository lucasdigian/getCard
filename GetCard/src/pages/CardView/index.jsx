import "../../styles/Card/card.scss";

//{Bibliotecas}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

//{Assets}
import logoGeti from "../../assets/createdByGeticompany.png";
import circleBlue from "../../assets/circleBlue.png";
import circleGreen from "../../assets/circleGreen.png";
import logoLattes from "../../assets/lattes.png";

//{Icons}
import {
  AiOutlineWhatsApp,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { MdPix } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";

//{Components}
import SaveContactButton from "../../components/saveContact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CardView() {
  const { card_id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    fotoUser: "",
    nomeUser: "",
    formacaoUser: "",
    cargoAtualUser: "",
    bioUser: "",
    whatsAppUser: "",
    instagramUser: "",
    linkedInUser: "",
    facebookUser: "",
    lattesUser: "",
    githubUser: "",
    siteUser: "",
    pixUser: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fa4uvgt6dzfkaf4khpwslybcgy0niuvd.lambda-url.us-east-2.on.aws",
          {
            params: {
              card_id: card_id,
            },
          }
        );
        setUser({
          fotoUser: response.data.foto_perfil,
          nomeUser: response.data.nome,
          formacaoUser: response.data.formacao,
          cargoAtualUser: response.data.cargo_atual,
          bioUser: response.data.biografia,
          whatsAppUser: response.data.whatsapp,
          instagramUser: response.data.instagram,
          linkedInUser: response.data.site,
          facebookUser: response.data.facebook,
          lattesUser: response.data.lattes,
          githubUser: response.data.github,
          siteUser: response.data.site,
          pixUser: response.data.chave_pix,
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setTimeout(() => {
            toast.success("Bem-vindo ao GetiCard! Faça seu cadastro.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 1000);
          navigate(`/cadastrar-usuario/${card_id}`);
        }
        console.error(error);
        console.error(error.response);
      }
    };

    fetchData();
  }, [card_id, navigate]);

  const contact = {
    name: user.nomeUser,
    phoneNumber: user.whatsAppUser,
  };

  return (
    <div className="main">
      <ToastContainer />
      <img src={circleGreen} alt="círculo verde" className="circleGreen" />
      <img src={circleBlue} alt="círculo azul" className="circleeBlue" />
      <div className="login-page">
        <div className="card-page">
          <div className="card-info">
            <div className="image-card">
              <img
                className="foto-usuario"
                src={user.fotoUser}
                alt="Avatar do usuário"
              />
            </div>
            <span className="name-user">{user.nomeUser}</span>
            <div className="grid-container">
              {(user.formacaoUser !== "") & (user.cargoAtualUser === "") ? (
                <span className="center">{user.formacaoUser}</span>
              ) : (
                ""
              )}
              {(user.formacaoUser === "") & (user.cargoAtualUser !== "") ? (
                <span className="center">{user.cargoAtualUser}</span>
              ) : (
                ""
              )}
              {(user.formacaoUser !== "") & (user.cargoAtualUser !== "") ? (
                <>
                  <span className="right">{user.formacaoUser}</span>
                  <span className="center">|</span>
                  <span className="left">{user.cargoAtualUser}</span>
                </>
              ) : (
                ""
              )}
              {(user.formacaoUser === "") & (user.cargoAtualUser === "")
                ? ""
                : ""}
            </div>
          </div>
          {user.bioUser !== "" ? (
            <span className="bio-user">{user.bioUser}</span>
          ) : (
            ""
          )}
          <div className="links-user">
            {user.whatsAppUser !== "" ? (
              <Link
                to={`https://api.whatsapp.com/send?phone=+55${user.whatsAppUser}&text=Olá! Vim pelo seu GetiCard.`}
                target="_blank"
              >
                <div className="link">
                  <AiOutlineWhatsApp className="icon" />
                  WhatsApp
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.instagramUser !== "" ? (
              <Link to={`https://${user.instagramUser}`} target="_blank">
                <div className="link">
                  <AiOutlineInstagram className="icon" />
                  Instagram
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.linkedInUser !== "" ? (
              <Link to={`www.${user.facebookUser}`} target="_blank">
                <div className="link">
                  <AiOutlineLinkedin className="icon" />
                  LinkedIn
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.facebookUser !== "" ? (
              <Link>
                <div className="link">
                  <AiOutlineFacebook className="icon" />
                  Facebook
                </div>
              </Link>
            ) : (
              ""
            )}
            {user.lattesUser !== "" ? (
              <Link>
                <div className="link">
                  <img
                    src={logoLattes}
                    alt="Logo Lattes"
                    className="inputLogoLattes"
                  />
                  Lattes
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.githubUser !== "" ? (
              <Link>
                <div className="link">
                  <AiOutlineGithub className="icon" />
                  Github
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.siteUser !== "" ? (
              <Link>
                <div className="link">
                  <CgWebsite className="icon" />
                  Site
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.pixUser !== "" ? (
              <Link>
                <div className="link">
                  <MdPix className="icon" />
                  Chave Pix
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
          <SaveContactButton className="button" contact={contact} />
          <div className="footer">
            <img src={logoGeti} alt="Logo" className="logoGeti" />
          </div>
        </div>
      </div>
    </div>
  );
}
