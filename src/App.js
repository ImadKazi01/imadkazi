import './Sass/styles.scss'
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import { Home } from './Pages/Home';

function App() {
  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route forceRefresh={true} exact={true} path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
