import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = ({ userRole, onLogout }) => {
	const SIDEBAR_ITEMS = [
	  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/", roles: ["doc", "admin", "receptionist"] },
	  { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products", roles: ["doc", "admin"] },
	  { name: "Users", icon: Users, color: "#EC4899", href: "/users", roles: ["doc", "admin"] },
	  { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales", roles: ["admin"] },
	  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders", roles: ["admin"] },
	  { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics", roles: ["admin"] },
	  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings", roles: ["doc", "admin", "receptionist"] },
	];
  
	return (
	  <div className="relative z-10 flex-shrink-0 w-64">
		<div className="flex flex-col h-full p-4 bg-gray-800 bg-opacity-50 border-r border-gray-700 backdrop-blur-md">
		  <button
			onClick={onLogout}
			className="p-2 mb-4 text-white bg-red-600 rounded hover:bg-red-700"
		  >
			Logout
		  </button>
		  <nav className="flex-grow">
			{SIDEBAR_ITEMS.filter((item) => item.roles.includes(userRole)).map((item) => (
			  <Link key={item.href} to={item.href}>
				<div className="flex items-center p-4 mb-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-700">
				  <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
				  <span className="ml-4">{item.name}</span>
				</div>
			  </Link>
			))}
		  </nav>
		</div>
	  </div>
	);
};

export default Sidebar;
  