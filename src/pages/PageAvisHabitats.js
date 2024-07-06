import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import AvisHabitats from '../composants/AvisHabitats';


const PageAvisHabitats = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AvisHabitats />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageAvisHabitats;