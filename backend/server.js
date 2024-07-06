const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const AnimalModel = require("./models/Animaux");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function verifierToken(req, res, next) {
    const headerToken = req.headers['authorization'];
    if (typeof headerToken !== "undefined") {
        jwt.verify(headerToken, process.env.JWT_SECRET, (err, authData) => {
            console.log(authData)
            if (err) {
                res.status(403).send('Token érroné');
            } else {
                req.token = headerToken;
                req.authData = authData;
                next();
            }
        })
    }
}

app.get("/vues-animaux", (req, res) => {
    AnimalModel.find()
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
});

app.put("/augmenter-vues-animal", (req, res) => {
    const { prenom } = req.body;
    const { prenomNouvelAnimal } = req.body;

    if (prenom !== undefined) {
        AnimalModel.findOneAndUpdate(
            { prenom: prenom },
            { $inc: { nombreVues: 1 } })
            .then(animals => res.json(animals))
            .catch(animals => res.json(animals))
    }

    if (prenomNouvelAnimal !== undefined) {
        AnimalModel.findOneAndUpdate(
            { prenom: prenomNouvelAnimal },
            { $inc: { nombreVues: 1 } })
            .then(animals => res.json(animals))
            .catch(animals => res.json(animals))
    }
});

app.post("/ajout-animaux-vues", (req, res) => {
    const { prenomAnimal } = req.body;

    AnimalModel.insertMany(
        { prenom: prenomAnimal },
        { nombreVues: 0 })
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
});

app.delete("/supprimer-animaux-vues/:prenom", (req, res) => {
    const { prenom } = req.params;

    AnimalModel.findOneAndDelete({ prenom: prenom })
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
});

app.put("/modifier-animaux-vues/:prenom", (req, res) => {
    const { prenom } = req.params;
    const { nouveauPrenom } = req.body;

    AnimalModel.findOneAndUpdate(
        { prenom: prenom },
        { $set: { prenom: nouveauPrenom } })
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
});

app.use("/image", express.static(path.join(__dirname, "image")));

/*app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:5000;");
    return next();
});*/

const repertoireImage = path.join(__dirname, "image");

const stockage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, repertoireImage);
    },
    filename: function (req, file, cb) {
        const nom_fichier = `image-${file.originalname.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        cb(null, nom_fichier);
    }
});

const filtreFichier = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Seuls les fichiers image sont autorisés."), false);
    }
};

const exporter = multer({ storage: stockage, fileFilter: filtreFichier });

let db;

if (process.env.JAWSDB_URL) {
    db = mysql.createConnection(process.env.JAWSDB_URL)
    console.log("connexion mysql avec process.env.JAWSDB_URL");
} else {
    console.log("connexion avec localhost");
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root', // remplacez par votre utilisateur
        password: '', // remplacez par votre mot de passe
        database: 'zoo' // remplacez par le nom de votre base de données
        // Paramètres de connexion MySQL
    });
}

/*const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});*/

db.connect(err => {
    if (err) throw err;
    console.log('Connecté à la base de données Zoo');

    const creerTableAnimaux = `
    CREATE TABLE IF NOT EXISTS animaux(
        id INT AUTO_INCREMENT PRIMARY KEY,
        prenom VARCHAR(255) NOT NULL,
        race VARCHAR(255) NOT NULL,
        habitat VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
    )`;

    const creerTableHabitats = `
    CREATE TABLE IF NOT EXISTS habitats(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )`;

    const creerTablePersonnels = `
    CREATE TABLE IF NOT EXISTS personnels(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom_utilisateur VARCHAR(255) NOT NULL,
        mot_de_passe VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL
    )`;

    const creerTableServices = `
    CREATE TABLE IF NOT EXISTS services(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )`;

    const creerTableAvisNonVerif = `
    CREATE TABLE IF NOT EXISTS avis_non_verif(
        id INT AUTO_INCREMENT PRIMARY KEY,
        pseudo VARCHAR(255) NOT NULL,
        message VARCHAR(255) NOT NULL
    )`;

    const creerTableAvisVerif = `
    CREATE TABLE IF NOT EXISTS avis_verif(
        id INT AUTO_INCREMENT PRIMARY KEY,
        pseudo VARCHAR(255) NOT NULL,
        message VARCHAR(255) NOT NULL
    )`;

    const creerTableHoraires = `
    CREATE TABLE IF NOT EXISTS horaires(
        id INT AUTO_INCREMENT PRIMARY KEY,
        jour VARCHAR(255) NOT NULL,
        heure_ouverture VARCHAR(255) NOT NULL,
        heure_fermeture VARCHAR(255) NOT NULL,
        ouvert_fermer VARCHAR(255) NOT NULL
    )`;

    const creerTableQuestions = `
    CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )`;

    const creerTableNourrirAnimaux = `
    CREATE TABLE IF NOT EXISTS nourrir_animaux (
        id INT AUTO_INCREMENT PRIMARY KEY,
        prenom VARCHAR(255) NOT NULL,
        nourriture VARCHAR(255) NOT NULL,
        quantite_nourriture VARCHAR(255) NOT NULL,
        date_nourriture VARCHAR(255) NOT NULL
    )`;

    const creerTableSoins = `
    CREATE TABLE IF NOT EXISTS soins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        prenom VARCHAR(255) NOT NULL,
        etat VARCHAR(255) NOT NULL,
        date_soins VARCHAR(255) NOT NULL
    )`;

    db.query((creerTableAnimaux, creerTableHabitats,
        creerTablePersonnels, creerTableServices,
        creerTableAvisNonVerif, creerTableAvisVerif, creerTableHoraires,
        creerTableQuestions, creerTableNourrirAnimaux, creerTableSoins), err => {
            if (err) throw err;
            console.log(`Les tables 'animaux', 'habitats', 'personnels', 'services', 
                'avis_non_verif', 'avis_verif', 'horaires', 'questions', 'nourrir_animaux' 
                et 'soins' sont prêtes`);
        });
});

app.get("/animaux", (req, res) => {
    const request = "SELECT * FROM animaux"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/habitats", (req, res) => {
    const request = "SELECT * FROM habitats"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/services", (req, res) => {
    const request = "SELECT * FROM services"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/personnels", (req, res) => {
    const request = "SELECT * FROM personnels"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/avis-non-verif", (req, res) => {
    const request = "SELECT * FROM avis_non_verif"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/avis-verif", (req, res) => {
    const request = "SELECT * FROM avis_verif"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/horaires", (req, res) => {
    const request = "SELECT * FROM horaires"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/questions", (req, res) => {
    const request = "SELECT * FROM questions"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/nourriture-animaux", (req, res) => {
    const request = "SELECT * FROM nourrir_animaux"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/soins-animaux", (req, res) => {
    const request = "SELECT * FROM soins"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.post("/connexion", (req, res) => {
    const { nom_utilisateur, mot_de_passe } = req.body;

    db.query("SELECT * FROM personnels WHERE nom_utilisateur = ?", [nom_utilisateur], (err, results) => {
        if (err) {
            res.status(500).send("Erreur dans la recherche du compte du personnel");
        }
        if (results.length === 0) {
            res.status(401).send("Utilisateur non trouvé");
        } else {
            console.log("Connexion réussis")
        }

        if (mot_de_passe.includes("admin")) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(mot_de_passe, salt, (err, hash) => {
                    const utilisateur = results[0];
                    bcrypt.compare(utilisateur.mot_de_passe, hash, (err, result) => {
                        if (result) {

                            const token = jwt.sign({ utilisateur_id: utilisateur.id, nom_utilisateur: utilisateur.nom_utilisateur }, process.env.JWT_SECRET, {
                                expiresIn: "24h"
                            })

                            res.status(200).json({ success: true, message: "connexion réussis", role: utilisateur.role, token });
                        } else {
                            console.log(result)
                            res.status(401).json({ success: false, message: "Mot de passe incorrect" });
                        }
                    })
                })
            })
        }
        else {
            const utilisateur = results[0];
            bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe, (err, result) => {
                if (result) {

                    const token = jwt.sign({ utilisateur_id: utilisateur.id, nom_utilisateur: utilisateur.nom_utilisateur }, process.env.JWT_SECRET, {
                        expiresIn: "24h"
                    })

                    res.status(200).json({ success: true, message: "connexion réussis", role: utilisateur.role, token });
                } else {
                    console.log(result)
                    res.status(401).json({ success: false, message: "Mot de passe incorrect" });
                }
            })
        }
    });
});

app.post("/creer-personnels", verifierToken, (req, res) => {
    const { nom_utilisateur, mot_de_passe, role } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(mot_de_passe, salt, (err, hash) => {
            if (err) {
                return res.status(500).send("Erreur lors du hashage");
            }

            const request = "INSERT INTO personnels (nom_utilisateur, mot_de_passe, role) VALUES (?, ?, ?)";

            db.query(request, [nom_utilisateur, hash, role], (err, result) => {
                if (err) {
                    res.status(500).send("Erreur lors de la création du personnel");
                }
                else {
                    console.log("Personnel créer avec succès");
                    res.status(201).send("Personnel créer avec succès");
                }
            });
        });
    });
});

app.post("/ajout-animaux", verifierToken, exporter.single("image"), (req, res) => {
    const { prenom, race, habitat, description } = req.body;
    const nom_image = req.file ? req.file.filename : null;

    db.query("INSERT INTO animaux (prenom, race, habitat, image, description) VALUES (?, ?, ?, ?, ?)",
        [prenom, race, habitat, nom_image, description], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout de l'animal");
            }
            else {
                res.status(201).send("Animal ajouté avec succès");
            }
        });
});

app.post("/ajout-services", verifierToken, exporter.single("image"), (req, res) => {
    const { nom, description } = req.body;
    const nom_image = req.file ? req.file.filename : null;

    db.query("INSERT INTO services (nom, description, image) VALUES (?, ?, ?)",
        [nom, description, nom_image], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout du service");
            }
            else {
                console.log(result);
                res.status(201).send("Service ajouté avec succès");
            }
        });
});

app.post("/ajout-habitats", verifierToken, exporter.single("image"), (req, res) => {
    const { nom, description } = req.body;
    const nom_image = req.file ? req.file.filename : null;

    db.query("INSERT INTO habitats (nom, description, image) VALUES (?, ?, ?)",
        [nom, description, nom_image], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout de l'habitat");
            }
            else {
                console.log(result);
                res.status(201).send("Habitat ajouté avec succès");
            }
        });
});

app.post('/ajout-avis-non-verif', (req, res) => {
    const { pseudo, message } = req.body;

    db.query("INSERT INTO avis_non_verif (pseudo, message) VALUE (?, ?)", [pseudo, message], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'ajout de l\'avis');
        }
        else {
            console.log(result);
            res.status(201).send('Avis ajouté avec succès');
        }
    });
});

app.post('/ajout-avis-verif', verifierToken, (req, res) => {
    const { pseudo, message } = req.body;

    db.query("INSERT INTO avis_verif (pseudo, message) VALUE (?, ?)", [pseudo, message], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'ajout de l\'avis');
        }
        else {
            console.log(result);
            res.status(201).send('Avis ajouté avec succès');
        }
    });
});

app.post('/envoyer-questions', (req, res) => {
    const { titre, description, email } = req.body;

    db.query("INSERT INTO questions (titre, description, email) VALUE (?, ?, ?)", [titre, description, email], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'envoie de la question');
        }
        else {
            console.log(result);
            res.status(201).send('Question envoyé avec succès');
        }
    });
});

app.post("/ajout-soins/:prenom", verifierToken, exporter.single("image"), (req, res) => {
    const { prenom } = req.params;
    const { etat, date_soins } = req.body;

    db.query("INSERT INTO soins (prenom, etat, date_soins) VALUES (?, ?, ?)",
        [prenom, etat, date_soins], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout des soins de l'animal");
            }
            else {
                res.status(201).send("Soins de l'animal ajouté avec succès");
            }
        });
});

app.delete("/animaux/supprimer/:id", verifierToken, (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM animaux WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/animaux-nourriture/supprimer/:prenom", (req, res) => {
    const { prenom } = req.params;

    const request = "DELETE FROM nourrir_animaux WHERE prenom = ?";

    db.query(request, prenom, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/animaux-soins/supprimer/:prenom", (req, res) => {
    const { prenom } = req.params;

    const request = "DELETE FROM soins WHERE prenom = ?";

    db.query(request, prenom, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/services/supprimer/:id", verifierToken, (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM services WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/habitats/supprimer/:id", verifierToken, (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM habitats WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/personnels/supprimer/:id", verifierToken, (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM personnels WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/supprimer/avis-non-verif/:id", verifierToken, (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM avis_non_verif WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete('/supprimer/avis-verif', verifierToken, (req, res) => {
    const request = "DELETE FROM avis_verif";
    db.query(request, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.put("/animaux/modifier/:id", verifierToken, exporter.single("image"), (req, res) => {
    const { id } = req.params;
    const nom_image = req.file ? req.file.filename : null;

    if (nom_image === null) {
        const request = "UPDATE animaux SET `prenom`=?, `race`=?, `habitat`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.prenom, req.body.race, req.body.habitat, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
    else {
        const request = "UPDATE animaux SET `prenom`=?, `race`=?, `habitat`=?, `image`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.prenom, req.body.race, req.body.habitat, nom_image, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
});

app.put("/animaux-nourriture/modifier/:prenom", exporter.single("image"), (req, res) => {
    const { prenom } = req.params;
    const { nouveauPrenom } = req.body;

    const request = "UPDATE nourrir_animaux SET `prenom`=? WHERE prenom=?";
    db.query(request, [req.body.nouveauPrenom, prenom], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});

app.put("/animaux-soins/modifier/:prenom", exporter.single("image"), (req, res) => {
    const { prenom } = req.params;
    const { nouveauPrenom } = req.body;

    const request = "UPDATE soins SET `prenom`=? WHERE prenom=?";
    db.query(request, [req.body.nouveauPrenom, prenom], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});

app.put("/ajout-nourriture/:prenom", verifierToken, exporter.single(), (req, res) => {
    const { prenom } = req.params;
    const { nourriture, quantite_nourriture, date_nourriture } = req.body;

    db.query("INSERT INTO nourrir_animaux (prenom, nourriture, quantite_nourriture, date_nourriture) VALUES (?, ?, ?, ?)",
        [prenom, nourriture, quantite_nourriture, date_nourriture], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout de la nourriture de l'animal");
            }
            else {
                res.status(201).send("Nourriture de l'animal ajouté avec succès");
            }
        });
});

app.put("/avis-habitats/:id", verifierToken, exporter.single(), (req, res) => {
    const { id } = req.params;

    const request = "UPDATE habitats SET `etat`=? WHERE id=?";

    db.query(request, [req.body.etat, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});

app.put("/services/modifier/:id", verifierToken, exporter.single("image"), (req, res) => {
    const { id } = req.params;
    const nom_image = req.file ? req.file.filename : null;

    if (nom_image === null) {
        const request = "UPDATE services SET `nom`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.nom, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
    else {
        const request = "UPDATE services SET `nom`=?, `image`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.nom, nom_image, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
});

app.put("/habitats/modifier/:id", verifierToken, exporter.single("image"), (req, res) => {
    const { id } = req.params;
    const nom_image = req.file ? req.file.filename : null;

    if (nom_image === null) {
        const request = "UPDATE habitats SET `nom`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.nom, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
    else {
        const request = "UPDATE habitats SET `nom`=?, `image`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.nom, nom_image, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
});

app.put("/personnels/modifier/:id", verifierToken, (req, res) => {
    const { id } = req.params;
    const { mot_de_passe } = req.body;
    const { nom_utilisateur } = req.body;
    const { role } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(mot_de_passe, salt, (err, hash) => {
            if (err) {
                return res.status(500).send("Erreur lors du hashage");
            }

            const request = "UPDATE personnels SET `nom_utilisateur`=?, `mot_de_passe`=?, `role`=? WHERE id=?";

            db.query(request, [nom_utilisateur, hash, role, id], (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(result);
                }
            });
        });
    });
});

app.put("/horaires/modifier/:id", verifierToken, (req, res) => {
    const { id } = req.params;

    const request = "UPDATE horaires SET `heure_ouverture`=?, `heure_fermeture`=?, `ouvert_fermer`=? WHERE id=?";
    db.query(request, [req.body.heure_ouverture, req.body.heure_fermeture, req.body.ouvert_fermer, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});

app.listen(port, () => {
    console.log('Serveur connecté au port ' + port);
}); 