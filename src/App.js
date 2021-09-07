import LoginPage from './components/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from 'routes/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/">
              <LoginPage/>
            </Route>
            <PrivateRoute path="/" isAuthenticated={isAuthenticated} >
              <ProtectedRoutes />
            </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
