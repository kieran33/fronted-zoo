import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import AjoutHabitats from '../composants/AjoutHabitats';

const PageAjouterHabitats = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AjoutHabitats />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageAjouterHabitats;