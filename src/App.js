import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
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
            <Route exact path="/main">
              <MainPage/>
            </Route>
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
