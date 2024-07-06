import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationHabitats from '../composants/ModificationHabitats';


const PageModifierHabitats = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ModificationHabitats />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageModifierHabitats;