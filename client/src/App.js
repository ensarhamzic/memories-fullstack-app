import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
