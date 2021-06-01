import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import { Container } from 'react-bootstrap';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Products from './Components/Products';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoutes';
import AuthProvider from './auth/AuthContext';
import Product from "./Components/Product";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <Container>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Products} />
            <Route exact path="/product/:id" component={Product}/>
            <PrivateRoute exact path="/profile" component={Profile} />
          </Container>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
