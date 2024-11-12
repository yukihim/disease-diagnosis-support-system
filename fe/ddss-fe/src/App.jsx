import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';

import Home from './home/home.jsx';
import About_Us from './about-us/about-us.jsx';
import Sign_In from './sign-in/sign-in.jsx';

function App() {
  let component;

  switch (window.location.pathname) {
    case '/':
      component = <><Header /><Home /><Footer /></>
      break;
    case '/home':
      component = <><Header /><Home /><Footer /></>
      break;
    case '/about-us':
      component = <><Header /><About_Us /><Footer /></>;
      break;
    case '/sign-in':
      component = <><Header /><Sign_In /><Footer /></>;
      break;
    default:
      component = <><Header /><Home /><Footer /></>
      break;
  }

  return (
    <div className="container">
      {component}
    </div>
  );
}

export default App;
