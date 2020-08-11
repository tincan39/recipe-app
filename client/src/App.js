import React, { useState, useEffect, useContext } from 'react';
import CreateRecipe from "./components/CreateRecipe";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from './contexts/UserContext';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import EditRecipe from './components/EditRecipe';
import SearchPage from './components/SearchPage';
import ViewRecipe from './components/ViewRecipe';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

/**
 * Used for Routes that cannot be accessed without authentication
 */
function ProtectedRoute({ component: Component, ...rest }) {
  const [authCheck, setAuthCheck] = useState({ isAuth: false, loading: true });
  const { auth } = useContext(UserContext.context);

  //async call to check authentication status
  useEffect(() => {
    axios.get('/authUser').then(res => {
      setAuthCheck({ isAuth: res.data.isAuth, loading: false });
    });
  }, []);

  return (

    <Route {...rest} render={(props) =>
      (!authCheck.loading) ? (authCheck.isAuth || auth) ? (<Component {...props} />) : (<Redirect to={{
        pathname: "/login",
        state: { from: props.location },
      }} />)
        : (<div>loading</div>)
    } />
  );

}

function App() {

  return (
    <div>
      <BrowserRouter>
        <UserContext>
          <ProtectedRoute component={Homepage} path="/:username/home" />
          <ProtectedRoute path='/:username/edit/:id' component={EditRecipe} />
          <ProtectedRoute path='/:username/create' component={CreateRecipe} />
          <ProtectedRoute path='/:username/search/:q' component={SearchPage} />
          <ProtectedRoute path='/:username/view/:id' component={ViewRecipe} />
          <Route path='/login' component={Login} />
        </UserContext>
        <Route path='/register' component={Register} />
        <Route exact path="/" component={LandingPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
