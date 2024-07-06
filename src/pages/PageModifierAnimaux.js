import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationAnimaux from '../composants/ModificationAnimaux';

const PageModifierAnimaux = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ModificationAnimaux />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageModifierAnimaux;