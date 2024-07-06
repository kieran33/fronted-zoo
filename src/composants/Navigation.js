import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo-zoo-ecf.png';

const Navigation = () => {

    const role = localStorage.getItem('role');
    const connecté = localStorage.getItem('connecté');

    const navigate = useNavigate();

    const directionConnexion = () => {
        navigate("/connexion");
    }

    const directionAccueil = () => {
        navigate("/");
    };

    const deconnexion = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('connecté');
        localStorage.removeItem('token');
        navigate("/");
    };

    return (
        <div className="barre_navigation_global">
            <div>
                <img src={logo} style={{ cursor: 'pointer' }} width="50" height="auto" atl="logo zoo ecf"
                    onClick={directionAccueil}
                />
            </div>
            <div className="barre_navigation_onglet">
                <NavLink to={"/"}>
                    Accueil
                </NavLink>
                <NavLink to={"/animaux"}>
                    Animaux
                </NavLink>
                <NavLink to={"/habitats"}>
                    Habitats
                </NavLink>
                <NavLink to={"/services"}>
                    Services
                </NavLink>
                <NavLink to={"/contact"}>
                    Contact
                </NavLink>
                {role === "admin" ?
                    <NavLink to={"/dashboard-admin"}>
                        Dashboard admin
                    </NavLink>
                    :
                    null
                }
                {role === "employé" ?
                    <NavLink to={"/dashboard-employe"}>
                        Dashboard employé
                    </NavLink>
                    :
                    null
                }
                {role === "vétérinaire" ?
                    <NavLink to={"/dashboard-veterinaire"}>
                        Dashboard vétérinaire
                    </NavLink>
                    :
                    null
                }
                {connecté === "true" ?
                    <button className="bouton_zoo" onClick={deconnexion}>Se déconnecter</button>
                    :
                    <button className="bouton_zoo" onClick={directionConnexion}>Espace pro</button>
                }
            </div>
        </div>
    );
};

export default Navigation;