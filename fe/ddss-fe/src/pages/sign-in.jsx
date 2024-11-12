function Sign_In() {
    return (
        <div className="bg-black text-white border-2 border-white font-['Montagu_Slab'] font-light text-base p-4">
            <h2>Sign In</h2>
            <form>
                <label htmlFor="email">Email:</label><br/>
                <input type="email" id="email" name="email" required className="bg-gray-800 text-white p-2 mb-2 border border-gray-600 rounded" /><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" id="password" name="password" required className="bg-gray-800 text-white p-2 mb-2 border border-gray-600 rounded" /><br/>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign In</button>
            </form>
        </div>
    );
}

export default Sign_In;