import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import { Container } from 'react-bootstrap';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Register from './Components/Register';
import Products from './Components/Products';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoutes';
import AuthProvider from './auth/AuthContext';
import Product from './Components/Product';
import Footer from './Components/Footer';
import Orders from './Components/Myorders';
import Admin from "./Components/Admin";

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
            <PrivateRoute exact path="/product/:id" component={Product} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/myorders" component={Orders} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            <PrivateRoute exact path="/admin" component={Admin} />
          </Container>
        </Switch>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
