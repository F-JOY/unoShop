import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Produits from './pages/cat+prod'
import Acceuil from './pages/Acceuil'
import Footer from './components/footer';


import Header from './components/appBarF';
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
       
       
      </Switch>
    </Router>
  );
}

export default App;









