import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import authenticate from "./functions/auth";
import Signup from "./pages/Signup";
import MyShows from "./pages/MyShows";
import Login from "./pages/Login";
import ResetPwd from "./pages/ResetPwd";
import ChangePwd from "./pages/ChangePwd";
import Search from "./pages/Search";
import logout from "./functions/logout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    authenticate(setIsAuth);
  }, []);
  const toLogOut = () => {
    logout(setIsAuth);
  };
  return (
    <Router>
      <div className="App">
        <header>
          <Nav isAuth={isAuth} logout={toLogOut} />
        </header>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <Search isAuth={isAuth} />}
          ></Route>
          <Route path="/signup" component={(props) => <Signup />}></Route>
          <Route path="/reset" component={(props) => <ResetPwd />}></Route>
          <Route path="/recovery" component={(props) => <ChangePwd />}></Route>
          <Route
            path="/login"
            component={(...props) => (
              <Login isAuth={isAuth} setIsAuth={setIsAuth} />
            )}
          ></Route>
          <PrivateRoute
            isAuth={isAuth}
            path="/my-shows"
            component={(props) => <MyShows />}
          ></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
