import './App.css';
import Home from "./Components/Home";
import Header from "./Components/Header";
import {Container} from "react-bootstrap";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Products from './Components/Products';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (

    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/product" component={Products} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
