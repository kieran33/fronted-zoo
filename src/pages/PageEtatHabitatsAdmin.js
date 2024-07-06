import React from 'react';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import EtatHabitats from '../composants/EtatHabitats';

const PageEtatHabitatsAdmin = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <EtatHabitats />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageEtatHabitatsAdmin;