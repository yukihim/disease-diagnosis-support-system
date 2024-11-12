import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

import Home from './pages/home.jsx';
import About_Us from './pages/about-us.jsx';
import Sign_In from './pages/sign-in.jsx';

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
    <div className="bg-white">
      {component}
    </div>
  );
}

export default App;
