import axios from "axios";
import React, { Suspense, useState, lazy } from "react";
import Loader from "./components/Loader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthTokenContext, UserDataContext } from "./store";
import "./App.css";

const Header = lazy(() => import("./components/Header"));
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const DocumentationScreen = lazy(() => import("./screens/DocumentationScreen"));
const LoginScreen = lazy(() => import("./screens/LoginScreen"));
const CollectionsScreen = lazy(() => import("./screens/CollectionsScreen"));
const DetectScreen = lazy(() => import("./screens/DetectScreen"));
const LiveScreen = lazy(() => import("./screens/LiveScreen"));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen"));
const AccountScreen = lazy(() => import("./screens/AccountScreen"));
const Footer = lazy(() => import("./components/Footer"));

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
                  <Route path="/live" element={<LiveScreen />} />
                  <Route path="/account" element={<AccountScreen />} />
                  <Route
                    path="/documentation"
                    element={<DocumentationScreen />}
                  />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                </Routes>
              </Container>
            </main>
            <Footer />
          </Router>
        </UserDataContext.Provider>
      </AuthTokenContext.Provider>
    </Suspense>
  );
}

export default App;
