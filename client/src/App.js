import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import { Container } from 'react-bootstrap';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Products from './Components/Products';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoutes';
import AuthProvider from './auth/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main>
          <Container>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/product" component={Products} />
          </Container>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
