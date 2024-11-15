import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

import LoginPage from "./pages/LoginPage";

function App() {
  	const [user, setUser] = useState(null); // State for user role
	const navigate = useNavigate();

  	const handleLogin = (role) => {
		setUser(role);
		navigate("/")
	};
  	const handleLogout = () => {
		setUser(null);
		navigate("/login");
	};

  	const ProtectedRoute = ({ element, allowedRoles }) => allowedRoles.includes(user) ? element : <Navigate to="/login" replace />;

	return (
		<div className="flex h-screen overflow-hidden text-gray-100 bg-gray-900">
			{/* BG */}
			<div className="fixed inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
				<div className="absolute inset-0 backdrop-blur-sm" />
			</div>

			{user && <Sidebar userRole={user} onLogout={handleLogout} />}
			<Routes>
				<Route
					path="/login"
					element={<LoginPage onLogin={handleLogin} />}
				/>
				<Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
				<Route
					path="/"
					element={<ProtectedRoute element={<OverviewPage />} allowedRoles={["doc", "admin"]} />}
				/>
				<Route
					path="/products"
					element={<ProtectedRoute element={<ProductsPage />} allowedRoles={["admin"]} />}
				/>
				<Route
					path="/users"
					element={<ProtectedRoute element={<UsersPage />} allowedRoles={["admin"]} />}
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
					element={<ProtectedRoute element={<SettingsPage user={user} />} allowedRoles={["admin"]} />}
				/>
			</Routes>
		</div>
  	);
}

export default App;
