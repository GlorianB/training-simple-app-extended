import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Todolist from "./components/Todolist";
import Profile from "./components/Profile";
import Home from "./components/Home";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/todolist">Todolist</Link>
          </li>
        </ul>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              <Home />;
            }}
          >
            <Home />
          </Route>

          <Route path="/profile/:id" render={() => <Profile name="name" />} />
          <Route path="/profile" render={() => <Profile name="name" />} />
          <Route path="/todolist" render={() => <Todolist />} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
