import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Relatorio from '../pages/Relatórios';



const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/relatorios" component={Relatorio} />
    </Switch>
);

export default Routes;
