import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Menu from './components/Menu';
import Login from './pages/Login';
import TeslaAccount from './pages/TeslaAccount';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/teslaaccount" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/teslaaccount"
          element={
            user ? (
              <>
                <TeslaAccount
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
                {isMenuOpen && <Menu />}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
