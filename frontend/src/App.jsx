import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeCreated from "./pages/EmployeeCreated";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RedirecteAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-red-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
        <Routes>
          <Route
            path="/create-employee"
            element={
              <ProtectedRoute>
                <CreateEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-employee"
            element={
              <ProtectedRoute>
                <EditEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirecteAuthenticatedUser>
                <SignUpPage />
              </RedirecteAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirecteAuthenticatedUser>
                <LoginPage />
              </RedirecteAuthenticatedUser>
            }
          />
          <Route
            path="/employeeCreated"
            element={
              <ProtectedRoute>
                <EmployeeCreated />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
