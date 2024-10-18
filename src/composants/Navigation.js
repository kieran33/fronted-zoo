import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo-zoo-ecf.png";

const Navigation = () => {
  const role = localStorage.getItem("role");
  const connecté = localStorage.getItem("connecté");

  const navigate = useNavigate();

  const directionConnexion = () => {
    navigate("/connexion");
  };

  const directionAccueil = () => {
    navigate("/");
  };

  const deconnexion = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("connecté");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navigation-container navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="navigation">
          <div className="logo-container">
            <img
              src={logo}
              className="logo_zoo navbar-brand"
              alt="logo zoo arcadia"
              onClick={directionAccueil}
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible navigation menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Accueil
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/animaux" className="nav-link">
                  Animaux
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/habitats" className="nav-link">
                  Habitats
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/services" className="nav-link">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  Contact
                </NavLink>
              </li>

              {role === "admin" ? (
                <li className="nav-item">
                  <NavLink to="/dashboard-admin" className="nav-link">
                    Dashboard Admin
                  </NavLink>
                </li>
              ) : null}
              {role === "employé" ? (
                <li className="nav-item">
                  <NavLink to="/dashboard-employe" className="nav-link">
                    Dashboard Employé
                  </NavLink>
                </li>
              ) : null}
              {role === "vétérinaire" ? (
                <li className="nav-item">
                  <NavLink to="/dashboard-veterinaire" className="nav-link">
                    Dashboard Vétérinaire
                  </NavLink>
                </li>
              ) : null}
              <li></li>
            </ul>

            {/* Right-side buttons (Espace professionnel or Se déconnecter) */}
            <div>
              {!connecté ? (
                <button
                  className="btn bouton_zoo_connexion"
                  onClick={directionConnexion}
                >
                  Espace professionnel
                </button>
              ) : (
                <button
                  className="btn bouton_zoo_connexion"
                  onClick={deconnexion}
                >
                  Se déconnecter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
