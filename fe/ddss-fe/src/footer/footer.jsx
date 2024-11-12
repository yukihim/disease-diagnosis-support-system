import './Footer.css';

function Footer() {
    return (
        <footer className="Footer">
            <p>&copy; {new Date().getFullYear()} Disease Diagnosis Support System</p>
        </footer>
    );
}

export default Footer;
