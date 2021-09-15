import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/">
              <LoginPage/>
            </Route>
            <ProtectedRoute exact path="/main" component={MainPage} />
            <Route path="*" component={
              () => "404 NOT FOUND"
            }>

            </Route>
            
        </Switch>
      </Router>
    </div>
  );
}

export default App;
