import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MemoryBooksPage from "./pages/MemoryBooksPage/MemoryBooksPage";
import MemoriesPage from "./pages/MemoriesPage/MemoriesPage";
import { useSelector } from "react-redux";
import { verifyTokenOnRefresh } from "./store/userAsyncActions";
import { useDispatch } from "react-redux";
import SharedMemoryBooksPage from "./pages/SharedMemoryBooksPage/SharedMemoryBooksPage";

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
          {isAuth ? <MemoryBooksPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/signup" exact>
          {!isAuth ? <SignupPage /> : <Redirect to="/memory-books" />}
        </Route>
        <Route path="/login" exact>
          {!isAuth ? <LoginPage /> : <Redirect to="/memory-books" />}
        </Route>
        <Route path="/memory-books/:memoryBookId/memories">
          {isAuth ? <MemoriesPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/memory-books">
          {isAuth ? <MemoryBooksPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/shared-memory-books">
          {isAuth ? <SharedMemoryBooksPage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
