import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Produits from './pages/cat+prod'
import Acceuil from './pages/Acceuil'
import Footer from './components/footer';
import Header from './components/appBarF';

import { ProfilAdmin } from './pages/profilAdmin';
import { ProfilClient } from './pages/profilClient';
import { ProfilFournis } from './pages/ProfilFournis';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Acceuil /> 
        </Route>
        <Route exact path="/Produits">
          <Produits /> 
        </Route>
       
        <Route exact path="/ProfilAdmin">
          <ProfilAdmin /> 
        </Route>
        <Route exact path="/ProfilClient">
          <ProfilClient /> 
        </Route>
        <Route exact path="/ProfilFournis">
          <ProfilFournis /> 
        </Route>
       
      </Switch>
    </Router>
  );
}

export default App;









