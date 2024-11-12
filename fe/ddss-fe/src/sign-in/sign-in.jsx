import './sign-in.css';

function Sign_In() {
    return (
        <div className="sign-in">
            <h2>Sign In</h2>
            <form>
                <label htmlFor="email">Email:</label><br/>
                <input type="email" id="email" name="email" required /><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" id="password" name="password" required /><br/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default Sign_In;
