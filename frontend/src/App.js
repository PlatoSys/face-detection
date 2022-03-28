import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import Header from "./components/Header";
import LiveScreen from "./screens/LiveScreen";
import RegisterScreen from "./screens/RegisterScreen";
import './App.css';
import Loader from "./components/Loader";


function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/live" element={<LiveScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
            </Routes>
          </Container>
        </main>
        {/* <Footer /> */}
      </Router>
    </Suspense>
  );
}

export default App;
