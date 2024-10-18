import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navigation from "../composants/Navigation";
import Footer from "../composants/Footer";
//import { BACKEND_URL } from '../Constante';

const Connexion = () => {
  const [nom_utilisateur, setNom_utilisateur] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");

  const navigate = useNavigate();

  const seConnecter = async (e) => {
    e.preventDefault();
    try {
      const reponse = await axios.post(
        "https://backend-zoo-production.up.railway.app/connexion",
        { nom_utilisateur, mot_de_passe }
      );
      if (reponse.data.success) {
        localStorage.setItem("role", reponse.data.role);
        localStorage.setItem("connecté", reponse.data.success);
        localStorage.setItem("token", reponse.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur lors de la tentative de connexion.");
    }
  };

  const retourAccueil = () => {
    navigate("/");
  };

  return (
    <>
      <Navigation />
      <div className="login-container">
        <h1 className="login-title">Connexion</h1>
        <form className="login-form" onSubmit={seConnecter}>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={(e) => setNom_utilisateur(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              onChange={(e) => setMot_de_passe(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Se connecter
          </button>
          <button
            type="submit"
            className="login-button"
            onClick={retourAccueil}
          >
            Annuler
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Connexion;
