import { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LiveScreen from "./screens/LiveScreen";
import RegisterScreen from "./screens/RegisterScreen";
import "./App.css";
import Loader from "./components/Loader";
import LoginScreen from "./screens/LoginScreen";
import { AuthTokenContext, UserDataContext } from "./store";
import axios from "axios";
import CollectionsScreen from "./screens/CollectionsScreen";
import DetectScreen from "./screens/DetectScreen";

axios.defaults.headers.post["Content-Type"] = "application/json";

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [UserData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  return (
    <Suspense fallback={<Loader />}>
      <AuthTokenContext.Provider value={[authToken, setAuthToken]}>
        <UserDataContext.Provider value={[UserData, setUserData]}>
          <Router>
            <Header />
            <main className="py-3">
              <Container>
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/detect" element={<DetectScreen />} />
                  <Route path="/collections" element={<CollectionsScreen />} />
                  <Route path="/about" element={<AboutScreen />} />
                  <Route path="/live" element={<LiveScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                </Routes>
              </Container>
            </main>
            {/* <Footer /> */}
          </Router>
        </UserDataContext.Provider>
      </AuthTokenContext.Provider>
    </Suspense>
  );
}

export default App;
