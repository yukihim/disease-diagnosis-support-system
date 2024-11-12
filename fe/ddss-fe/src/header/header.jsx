import './Header.css'

function Header() {
    return (
        <header className="homeHeader">
            <nav>
                <ul>
                    <li>
                        <a href="/">HOME</a>
                    </li>
                    <li>
                        <a href="/about-us">ABOUT US</a>
                    </li>
                    <li>
                        <a href="/sign-in">SIGN IN</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
