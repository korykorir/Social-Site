import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch ,Route } from 'react-router-dom';

import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';

import { Provider } from 'react-redux';

import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import Routes from './component/routing/Routes';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App =()=> {

useEffect(()=>{
  store.dispatch(loadUser(), []);
})
  return (
    <Provider store ={store}>
      <Router>
      <Fragment>
      <Navbar/>
      <Switch>
      <Route exact path ='/' component={Landing} />
      <Route component = {Routes}/>

      </Switch>
     
      
    </Fragment>

    </Router>

    </Provider>
    
    
      
   
  );

}
  


export default App;
