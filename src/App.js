import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css';
import RoutePage from './page/route/route-page';
import LoginPage from './page/login/login-page';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/login" component={LoginPage} />
        <Route path="/" component={RoutePage} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
