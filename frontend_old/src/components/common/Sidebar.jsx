import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users, LogOut, House, LogIn } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
    { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/overview", roles: ["doc", "admin"] },
	{ name: "Patients", icon: Users, color: "#EC4899", href: "/patients", roles: ["doc", "admin", "receptionist"] },
    { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products", roles: ["doc", "admin"] },
    { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales", roles: ["admin"] },
    { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders", roles: ["admin"] },
    { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics", roles: ["admin"] },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings", roles: ["doc", "admin", "receptionist"] },
];

const Sidebar = ({ userRole, onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                isSidebarOpen ? "w-64" : "w-20"
            }`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className='flex flex-col h-full p-4 bg-gray-800 bg-opacity-50 border-r border-gray-700 backdrop-blur-md'>
				<div className="flex-col">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className='flex mt-1 ml-3 font-medium transition-colors rounded-lg p-l hover:bg-gray-700 max-w-fit'
					>
						<Menu size={24} />
						<AnimatePresence>
							{isSidebarOpen && (
								<motion.span
									className='ml-4 whitespace-nowrap'
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2, delay: 0.3 }}
								>
									Collapse
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</div>

                <nav className='flex-grow mt-8'>
					<Link key="/homepage" to="/homepage">
                        <motion.div className='flex items-center p-4 pl-3 mb-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-700'>
                            <House size={20} style={{ color: "#FFFFFF", minWidth: "20px" }} />
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        className='ml-4 whitespace-nowrap'
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2, delay: 0.3 }}
                                    >
                                        Homepage
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </Link>
					
                    {SIDEBAR_ITEMS.filter((item) => item.roles.includes(userRole)).map((item) => (
                        <Link key={item.href} to={item.href}>
                            <motion.div className='flex items-center p-4 pl-3 mb-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-700'>
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            className='ml-4 whitespace-nowrap'
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, delay: 0.3 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
					
					{userRole ? (
						<button
							onClick={onLogout}
							className="w-full"
						>
							<motion.div className='flex items-center p-4 pl-3 mb-2 text-sm font-medium transition-colors rounded-lg hover:bg-red-700'>
								<LogOut size={20} className="text-red-500" />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											Logout
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</button>
					) : (
						<Link key="/login"
							to="/login"
							className="w-full"
						>
							<motion.div className='flex items-center p-4 pl-3 mb-2 text-sm font-medium transition-colors rounded-lg hover:bg-red-700'>
								<LogIn size={20} className="text-red-500" />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											Login
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					)}
                </nav>
            </div>
        </motion.div>
    );
};

export default Sidebar;