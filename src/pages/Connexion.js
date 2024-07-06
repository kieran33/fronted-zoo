import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { BACKEND_URL } from '../Constante';

const Connexion = () => {

    const [nom_utilisateur, setNom_utilisateur] = useState('');
    const [mot_de_passe, setMot_de_passe] = useState('');

    const navigate = useNavigate();

    const seConnecter = async (e) => {
        e.preventDefault();
        try {
            const reponse = await axios.post(BACKEND_URL + "/connexion", { nom_utilisateur, mot_de_passe });
            if (reponse.data.success) {
                localStorage.setItem('role', reponse.data.role);
                localStorage.setItem('connecté', reponse.data.success);
                localStorage.setItem('token', reponse.data.token);
                navigate("/");
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert('Erreur lors de la tentative de connexion.');
        }
    };

    const retourAccueil = () => {
        navigate("/");
    };

    return (
        <>
            <Navigation />
            <h2 className="titre_service">Connexion</h2>
            <form className="formulaire" onSubmit={seConnecter}>
                <input
                    type="text"
                    name="nom_utilisateur"
                    className="champsFormulaire"
                    id="nom_utilisateur"
                    placeholder="Nom utilisateur..."
                    onChange={(e) => setNom_utilisateur(e.target.value)}
                    required
                />
                <label htmlFor="nom_utilisateur"></label>

                <input
                    type="password"
                    name="mot_de_passe"
                    className="champsFormulaire"
                    id="mot_de_passe"
                    placeholder="Mot de passe..."
                    onChange={(e) => setMot_de_passe(e.target.value)}
                    required
                />
                <label htmlFor="mot_de_passe"></label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Se connecter</button>
                    <button className="bouton_zoo" onClick={retourAccueil}>Annuler</button>
                </div>
            </form>
            <Footer />
        </>
    );
};

export default Connexion;

