import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     console.log("Token: ", token)
//     setIsAuthenticated(!!token)
//   },[rest.path])

//   return isAuthenticated ? <Route render={(props) => <Component {...props} {...rest}/>} /> : <Redirect to="/" />
// }


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
