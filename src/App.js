import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";
import Profile from "./pages/ProfilePages/Profile";
import AccountSettings from "./pages/AccountSetting/AccountSettings";
import BillingPage from "./pages/BillingPages/BillingPage";
import Users from "./pages/users/Users";
import { useUserRole } from "./contexts/UserRoleContext";
import { useAuth } from "./contexts/authContext";

function App() {
  const { currentUser } = useAuth();
  const { userRole } = useUserRole();

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const RequireRole = ({ allowedRoles, children }) => {
    const userRoles = userRole ? userRole.role : null;
    return allowedRoles.includes(userRole)
      ? children
      : "you are restricted for this pages";
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/profile"
          element={
            // <RequireAuth>
            <Profile />
            // </RequireAuth>
          }
        />
        <Route
          path="/account-settings"
          element={
            // <RequireAuth>
            <AccountSettings />
            // </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <Users />
            // <RequireAuth>
            //   <RequireRole allowedRoles={["admin"]}>
            //     <Users />
            //   </RequireRole>
            // </RequireAuth>
          }
        />
        <Route path="/billing" element={<BillingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
