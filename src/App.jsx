import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/home.component.jsx'
import Navigation from './components/routes/navigation/navigation.component.jsx';
import Authentication from './components/Authentication/Authentication.component.jsx';

const App = () => {

  return (
    // Routes allows us to register the route components that will render the component when it matches the route looking for
      // to utilize each route, they need to be wrapped by a Routes component of react-router
    //Each Route component will given a path, when the page matches the path , the route level component inserted will be rendered

    <Routes>
      <Route path ='/' element={ <Navigation />}>
        <Route index element ={ <Home />}/>
        <Route path='auth' element ={<Authentication/>}/>
      </Route>
    </Routes>
  )
};

export default App;

// have a main route that renders the nav bar
  // and all other routes will a child
// SO THE OUTLET in the nav component will be under the nav component so everything will be rendered under it