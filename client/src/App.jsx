import "./App.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, checkActive, setUser } from "./store/reducers/authSlice";
import Service from "./pages/service/Service";
import { useEffect } from "react";
import Success from "./pages/payment/Success";
import Cancel from "./pages/payment/Cancel";
import Search from "./pages/search/Search";
import MyList from "./pages/search/MyList";
import StackNotifications from "./components/notifications/StackNotifications";
function App() {
  const { user, isActive } = useSelector(authSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(checkActive());
    }
  }, [user]);

  return (
    <>
      <StackNotifications />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && isActive ? (
                <Home />
              ) : user && !isActive ? (
                <Service />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            exact
            path="/search"
            element={
              user && isActive ? (
                <Search />
              ) : user && !isActive ? (
                <Service />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          {user && (
            <>
              {isActive && (
                <>
                  <Route path="/movies" element={<Home type="movie" />} />
                  <Route path="/series" element={<Home type="series" />} />
                  <Route path="/watch" element={<Watch />} />
                  <Route path="/service" element={<Service />} />
                  {/* <Route path="/search" element={<Search />} /> */}
                  <Route path="/myList" element={<MyList />} />
                </>
              )}

              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
