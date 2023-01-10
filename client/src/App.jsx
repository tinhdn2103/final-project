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
import { movieSelector } from "./store/reducers/movieSlice";
function App() {
  const { user, isActive } = useSelector(authSelector);
  const { movie } = useSelector(movieSelector);

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
          {/* <Route
            exact
            path="/"
            element={
              user && isActive ? (
                <Home />
              ) : user && !isActive ? (
                <Navigate to="/service" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/search"
            element={
              user && isActive ? (
                <Search />
              ) : user && !isActive ? (
                <Navigate to="/service" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/service"
            element={user ? <Service /> : <Navigate to="/register" />}
          />
          <Route
            path="/movies"
            element={
              user && isActive ? (
                <Home type="movie" />
              ) : user && !isActive ? (
                <Navigate to="/service" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/series"
            element={
              user && isActive ? (
                <Home type="series" />
              ) : user && !isActive ? (
                <Navigate to="/service" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/watch"
            element={
              user && isActive ? (
                <Watch />
              ) : user && !isActive ? (
                <Navigate to="/service" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/myList"
            element={
              user && isActive ? (
                <MyList />
              ) : user && !isActive ? (
                <Navigate to="/service" />
              ) : (
                <Navigate to="/register" />
              )
            }
          /> */}
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/service" element={<Service />} />
          <Route path="/movies" element={<Home type="movie" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route
            path="/watch"
            element={!movie ? <Navigate to="/" /> : <Watch />}
          />
          <Route path="/myList" element={<MyList />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// {user && (
//   <>
//     {isActive && (
//       <>
//         <Route path="/movies" element={<Home type="movie" />} />
//         <Route path="/series" element={<Home type="series" />} />
//         <Route path="/watch" element={<Watch />} />
//         <Route path="/service" element={<Service />} />
//         {/* <Route path="/search" element={<Search />} /> */}
//         <Route path="/myList" element={<MyList />} />
//       </>
//     )}

//     <Route path="/success" element={<Success />} />
//     <Route path="/cancel" element={<Cancel />} />
//   </>
// )}
