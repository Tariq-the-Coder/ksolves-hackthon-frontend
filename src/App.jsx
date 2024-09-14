import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './components/Auth';
import ClassList from './components/ClassList';
import ClassDetail from './components/ClassDetail';
import SessionList from './components/SessionList';
import Header from './components/Header';
import InstructorDashboard from "./components/InstructorDashboard";
import ClassEnrollment from "./components/ClassEnrollment";  // New component
import Home from './components/Pages/Home';

const App = () => (
  <div className="grid-container">
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/classes" element={<ClassList />} />
          <Route path="/classes/:id" element={<ClassDetail />} />
          <Route path="/units/:id" element={<SessionList />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/enroll-classes" element={<ClassEnrollment />} /> 
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  </div>
);

export default App;
