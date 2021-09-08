import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MemoryBooks from "./pages/MemoryBooksPage/MemoryBooksPage";
import { useSelector } from "react-redux";
import { verifyTokenOnRefresh } from "./store/userAsyncActions";
import { useDispatch } from "react-redux";

function App() {
  const dispatchRedux = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatchRedux(verifyTokenOnRefresh(token));
    }
  }, [dispatchRedux]);

  return (
    <div>
      <NavBar isAuth={isAuth} />
      <Switch>
        <Route path="/" exact>
          {isAuth ? <MemoryBooks /> : <Redirect to="/login" />}
        </Route>
        <Route path="/signup">
          {!isAuth ? <SignupPage /> : <Redirect to="/memory-books" />}
        </Route>
        <Route path="/login">
          {!isAuth ? <LoginPage /> : <Redirect to="/memory-books" />}
        </Route>
        <Route path="/memory-books">
          {isAuth ? <MemoryBooks /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
