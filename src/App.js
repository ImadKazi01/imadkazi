import './Sass/styles.scss'
import { Nav } from './Components/Nav';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import { Home } from './Pages/Home';
import {Showcase} from './Pages/Showcase';
import {About} from './Pages/About';
import {Contact} from './Pages/Contact';


function App() {
  return (
    <Router forceRefresh={true}>
      <Nav/>
      <Switch>
        <Route forceRefresh={true} exact={true} path="/">
          <Home />
        </Route>
        <Route exact path="/showcase">
          <Showcase />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
