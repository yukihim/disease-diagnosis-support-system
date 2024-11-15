import { useState } from "react";

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (username === "doc" && password === "doc123") {
        onLogin("doc");
        } else if (username === "admin" && password === "admin123") {
        onLogin("admin");
        } else {
        setError("Invalid username or password.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
        handleLogin();
        }
    };

    return (
        <div className='relative z-10 flex-1 overflow-auto'>
            <div className="flex items-center justify-center h-screen">
                <div className="p-8 bg-gray-800 rounded shadow-md">
                    <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 mb-4 bg-gray-700 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 bg-gray-700 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        onClick={handleLogin}
                    >Login</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
