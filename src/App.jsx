import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRegister from "./app/features/user/components/UserRegister";
import UsersList from "./app/features/user/components/UsersList";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/user-register" element={<UserRegister />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
