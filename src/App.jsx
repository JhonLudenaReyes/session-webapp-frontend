import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./app/features/layout/components/navbar/Navigation";
import Landing from "./app/features/layout/components/Landing";
import Footer from "./app/features/layout/components/Footer";
import Login from "./app/features/auth/components/Login";
import Register from "./app/features/person/components/Register";
import UserRegister from "./app/features/user/components/UserRegister";
import DashboardAdmin from "./app/features/dashboard/components/DashboardAdmin";
import UsersList from "./app/features/user/components/UsersList";

const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/session-frontend" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/users/users-list" element={<UsersList />} />
          <Route path="/Users/user-register" element={<UserRegister />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
