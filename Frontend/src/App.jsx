import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import PatientsPage from "./pages/PatientsPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  	const [user, setUser] = useState(null); // State for user role
	const navigate = useNavigate();

  	const handleLogin = (role) => {
		setUser(role);
		navigate("/")
	};
  	const handleLogout = () => {
		setUser(null);
		navigate("/homepage");
	};

  	const ProtectedRoute = ({ element, allowedRoles }) => allowedRoles.includes(user) ? element : <Navigate to="/login" replace />;

	return (
		<div className="flex h-screen overflow-hidden text-gray-100 bg-gray-900">
			{/* BG */}
			<div className="fixed inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
				<div className="absolute inset-0 backdrop-blur-sm" />
			</div>

			<Sidebar userRole={user} onLogout={handleLogout} />
			{/* {user && <Sidebar userRole={user} onLogout={handleLogout} />} */}
			<Routes>
				<Route
					path="/homepage"
					element={<HomePage />}
				/>
				<Route
					path="/login"
					element={<LoginPage onLogin={handleLogin} />}
				/>
				<Route
                    path="*"
                    element={<Navigate to="/homepage" replace />}
                />
				<Route
					path="/overview"
					element={<ProtectedRoute element={<OverviewPage />} allowedRoles={["doc", "admin"]} />}
				/>
				<Route
					path="/patients"
					element={<ProtectedRoute element={<PatientsPage />} allowedRoles={["doc", "admin", "receptionist"]} />}
				/>
				<Route
					path="/products"
					element={<ProtectedRoute element={<ProductsPage />} allowedRoles={["doc", "admin"]} />}
				/>
				<Route
					path="/sales"
					element={<ProtectedRoute element={<SalesPage />} allowedRoles={["admin"]} />}
				/>
				<Route
					path="/orders"
					element={<ProtectedRoute element={<OrdersPage />} allowedRoles={["admin"]} />}
				/>
				<Route
					path="/analytics"
					element={<ProtectedRoute element={<AnalyticsPage />} allowedRoles={["admin"]} />}
				/>
				<Route
					path="/settings"
					element={<ProtectedRoute element={<SettingsPage user={user} />} allowedRoles={["doc", "admin", "receptionist"]} />}
				/>
			</Routes>
		</div>
  	);
}

export default App;
