import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const DonnerAvis = () => {

    const [nouvelAvis, setNouvelAvis] = useState({
        id: "",
        pseudo: "",
        message: ""
    });

    const [donnerAvis, setDonnerAvis] = useState(false);

    const inputChangement = (e) => {
        const { name, value } = e.target;
        const nouvelleValeur = value;

        setNouvelAvis({
            ...nouvelAvis,
            [name]: nouvelleValeur,
        });
    };

    const AjouterAvis = () => {

        try {
            const reponse = axios.post('http://localhost:3002/ajout-avis-non-verif', nouvelAvis, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (reponse) {
                setDonnerAvis(false);
                alert('Merci d\'avoir laissé votre avis, il sera traiter prochainement')
            }
        } catch (error) {
            console.error('Erreur:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div className="centrer">
            {donnerAvis === false ?
                <button className="bouton_zoo" onClick={() => setDonnerAvis(true)}>Donner son avis</button>
                :
                <div>
                    <form className="formulaire" onSubmit={AjouterAvis}>
                        <input
                            type="text"
                            name="pseudo"
                            id="pseudo"
                            className="champsFormulaire"
                            placeholder="Votre pseudo"
                            onChange={inputChangement}
                            required
                        />
                        <label htmlFor="pseudo"></label>

                        <textarea
                            name="message"
                            id="message"
                            className="champsFormulaire_textarea"
                            placeholder="Votre message"
                            onChange={inputChangement}
                            required
                        />
                        <label htmlFor="message"></label>
                        <div className="centrer">
                            <button className="bouton_zoo" type="submit">Confimer</button>
                            <button className="bouton_zoo" onClick={() => setDonnerAvis(false)}>Annuler</button>
                        </div>
                    </form>
                </div>
            }
        </div >
    );
};

export default DonnerAvis;