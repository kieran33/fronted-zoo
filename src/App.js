import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Animaux from './pages/Animaux';
import Habitats from './pages/Habitats';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import Erreur from './pages/Erreur';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardEmploye from './pages/DashboardEmploye';
import DashboardVeterinaire from './pages/DashboardVeterinaire';
import DetailsModificationPersonnels from './pages/DetailsModificationPersonnels';
import DetailsAnimaux from './pages/DetailsAnimaux';
import DetailsHabitats from './pages/DetailsHabitats';
import DetailsModificationAnimaux from './pages/DetailsModificationAnimaux';
import DetailsModificationServices from './pages/DetailsModificationServices';
import DetailsModificationHabitats from './pages/DetailsModificationHabitats';
import PageCreationComptePersonnels from './pages/PageCreationComptePersonnels';
import PageModificationComptePersonnels from './pages/PageModificationComptePersonnels';
import PageSuppressionComptePersonnels from './pages/PageSuppressionComptePersonnels';
import PageAjouterAnimaux from './pages/PageAjouterAnimaux';
import PageModifierAnimaux from './pages/PageModifierAnimaux';
import PageSupprimerAnimaux from './pages/PageSupprimerAnimaux';
import PageAjouterServices from './pages/PageAjouterServices';
import PageModifierServices from './pages/PageModifierServices';
import PageSupprimerServices from './pages/PageSupprimerServices';
import PageAjouterHabitats from './pages/PageAjouterHabitats';
import PageModifierHabitats from './pages/PageModifierHabitats';
import PageSupprimerHabitats from './pages/PageSupprimerHabitats';
import PageAjouterServicesEmploye from './pages/PageAjouterServicesEmploye';
import PageModifierServicesEmploye from './pages/PageModifierServicesEmploye';
import DetailsModificationServicesEmploye from './pages/DetailsModificationServicesEmploye';
import PageSupprimerServicesEmploye from './pages/PageSupprimerServicesEmploye';
import PageNourrirAnimauxEmploye from './pages/PageNourrirAnimauxEmploye';
import DetailsAjoutNourritureAnimaux from './pages/DetailsAjoutNourritureAnimaux';
import CompteRenduAnimaux from './pages/CompteRenduAnimaux';
import DetailsCompteRenduAnimaux from './pages/DetailsCompteRenduAnimaux';
import PageAvisHabitats from './pages/PageAvisHabitats';
import DetailsAvisHabitats from './pages/DetailsAvisHabitats';
import PageEtatAnimauxAdmin from './pages/PageEtatAnimauxAdmin';
import AvisModerationEmploye from './composants/AvisModerationEmploye';
import PageModifierHoraires from './pages/PageModifierHoraires';
import DetailsModificationHoraires from './pages/DetailsModificationHoraires';
import QuestionsVisiteurs from './composants/QuestionsVisiteurs';
import PageEtatHabitatsAdmin from './pages/PageEtatHabitatsAdmin';
import AnimauxPopulaires from './composants/AnimauxPopulaires';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/animaux" element={<Animaux />} />
          <Route path="/animaux/:id/:prenom" element={<DetailsAnimaux />} />
          <Route path="/habitats" element={<Habitats />} />
          <Route path="/habitats/:id" element={<DetailsHabitats />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-admin/creation-personnels" element={<PageCreationComptePersonnels />} />
          <Route path="/dashboard-admin/modification-personnels" element={<PageModificationComptePersonnels />} />
          <Route path="/dashboard-admin/suppression-personnels" element={<PageSuppressionComptePersonnels />} />
          <Route path="/dashboard-admin/ajout-animaux" element={<PageAjouterAnimaux />} />
          <Route path="/dashboard-admin/modification-animaux" element={<PageModifierAnimaux />} />
          <Route path="/dashboard-admin/suppression-animaux" element={<PageSupprimerAnimaux />} />
          <Route path="/dashboard-admin/ajout-services" element={<PageAjouterServices />} />
          <Route path="/dashboard-admin/modification-services" element={<PageModifierServices />} />
          <Route path="/dashboard-admin/suppression-services" element={<PageSupprimerServices />} />
          <Route path="/dashboard-admin/ajout-habitats" element={<PageAjouterHabitats />} />
          <Route path="/dashboard-admin/modification-habitats" element={<PageModifierHabitats />} />
          <Route path="/dashboard-admin/suppression-habitats" element={<PageSupprimerHabitats />} />
          <Route path="/dashboard-admin/etat-animaux" element={<PageEtatAnimauxAdmin />} />
          <Route path="/dashboard-admin/modifier-horaires" element={<PageModifierHoraires />} />
          <Route path="/dashboard-admin/etat-habitats" element={<PageEtatHabitatsAdmin />} />
          <Route path="/dashboard-admin/animaux-populaires" element={<AnimauxPopulaires />} />

          <Route path="/dashboard-employe/ajout-services" element={<PageAjouterServicesEmploye />} />
          <Route path="/dashboard-employe/modification-services" element={<PageModifierServicesEmploye />} />
          <Route path="/dashboard-employe/modifier-services/:id" element={<DetailsModificationServicesEmploye />} />
          <Route path="/dashboard-employe/suppression-services" element={<PageSupprimerServicesEmploye />} />
          <Route path="/dashboard-employe/ajout-nourriture" element={<PageNourrirAnimauxEmploye />} />
          <Route path="/dashboard-employe/ajout-nourriture/:id/:prenom" element={<DetailsAjoutNourritureAnimaux />} />
          <Route path="/dashboard-employe/moderer-avis" element={<AvisModerationEmploye />} />
          <Route path="//dashboard-employe/questions-visiteurs" element={<QuestionsVisiteurs />} />

          <Route path="/dashboard-veterinaire/compte-rendu-animaux" element={<CompteRenduAnimaux />} />
          <Route path="/dashboard-veterinaire/compte-rendu-animaux/:id/:prenom" element={<DetailsCompteRenduAnimaux />} />
          <Route path="/dashboard-veterinaire/avis-habitats" element={<PageAvisHabitats />} />
          <Route path="/dashboard-veterinaire/aivs-habitats/:id" element={<DetailsAvisHabitats />} />


          <Route path="/dashboard-admin/modifier-animaux/:id/:prenom" element={<DetailsModificationAnimaux />} />
          <Route path="/dashboard-admin/modifier-services/:id" element={<DetailsModificationServices />} />
          <Route path="/dashboard-admin/modifier-habitats/:id" element={<DetailsModificationHabitats />} />
          <Route path="/dashboard-admin/modifier-personnels/:id" element={<DetailsModificationPersonnels />} />
          <Route path="/dashboard-admin/modifier-horaires/:id" element={<DetailsModificationHoraires />} />
          <Route path="/dashboard-employe" element={<DashboardEmploye />} />
          <Route path="/dashboard-veterinaire" element={<DashboardVeterinaire />} />
          <Route path="*" element={<Erreur />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
