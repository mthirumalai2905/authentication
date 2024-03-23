import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import UserContext from "./UserContext";

const App = () => {
  const [user, setUser] = useState(null);

  // Function to handle login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is already logged in
  const checkLoggedIn = () => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  };

  // Call checkLoggedIn on initial render
  useEffect(() => {
    checkLoggedIn();
  }, []); // Empty dependency array to run only on mount

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div>
          {/* Conditional rendering for logged in/out state */}
          {!!user ? (
            <div>
              Logged in as {user.email} |{' '}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>Not Logged in</div>
          )}
        </div>
        {/* Navigation links */}
        <div>
          <Link to="/">Home</Link>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
        </div>
        {/* Route configurations */}
        <Routes>
          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route path="/register" element={<Register />} />
          {/* Redirect to home if user is logged in */}
          {!!user ? <Navigate to="/" /> : null}
        </Routes>
        <hr />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
