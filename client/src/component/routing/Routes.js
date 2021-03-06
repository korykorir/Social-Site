import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../component/dashboard/Dashboard';
import PrivateRoute from '../../component/routing/PrivateRoute';
import CreateProfile from '../../component/profile-forms/CreateProfile';
import EditProfile from '../../component/profile-forms/EditProfile';
import AddExperience from '../../component/profile-forms/AddExperience';
import AddEducation from '../../component/profile-forms/AddEducation';
import Profiles from '../../component/profiles/Profiles';
import Profile from '../../component/profile/Profile';
import Posts from '../../component/posts/Posts';
import Post from '../../component/post/Post';
import NotFound from '../../component/layout/NotFound';
import Login from '../../component/auth/Login';
import Register from '../../component/auth/Register';
import Alert from '../../component/layout/alert';


const Routes = () => {
    return (
        <section className ='container'>
        <Alert />
        <Switch>
          <Route exact path = '/register'component={Register}/>
          <Route exact path = '/login'component={Login}/>
          <Route exact path = '/profiles' component={Profiles}/>
          <Route exact path = '/profile/:id' component={Profile}/>
          <PrivateRoute exact path = '/dashboard' component={Dashboard}/>
          <PrivateRoute exact path = '/create-profile' component={CreateProfile}/>
          <PrivateRoute exact path = '/edit-profile' component={EditProfile}/>
          <PrivateRoute exact path = '/add-experience' component={AddExperience}/>
          <PrivateRoute exact path = '/add-education' component={AddEducation}/>
          <PrivateRoute exact path = '/posts' component={Posts}/>
          <PrivateRoute exact path = '/posts/:id' component={Post}/>
          <Route component = {NotFound}/>
          
        </Switch>
      </section>
    );
}

export default Routes;