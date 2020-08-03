import React from 'react';
//import Recipe from './components/Recipe';
import CreateRecipe from "./components/CreateRecipe";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from './contexts/UserContext';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import EditRecipe from './components/EditRecipe';
import SearchPage from './components/SearchPage';
import ViewRecipe from './components/ViewRecipe';
import { BrowserRouter, Route } from 'react-router-dom';


function App() {

  return (
    <div>
      <BrowserRouter>
        <UserContext>
          <Route path="/:username/home" component={Homepage} />
          <Route path='/:username/edit/:id' component={EditRecipe} />
          <Route path='/:username/create' component={CreateRecipe} />
          <Route path='/:username/search' component={SearchPage} />
          <Route path='/:username/view/:id' component={ViewRecipe} />
        </UserContext>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route exact path="/" component={LandingPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
