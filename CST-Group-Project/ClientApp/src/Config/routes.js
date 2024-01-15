import React from "react";
import PageNotFoundComponent from '../Pages/PageNotFound'
import TimelineComponent from '../Pages/Timeline'
import ForumComponent from '../Pages/Forum'
import ProfileComponent from '../Pages/Profile'
import SignupComponent from '../Pages/Signup'
import Login from '../Pages/Login';


const routes =[
    {
        // Decide what page should be shown initially - Timeline or login? 
        // If timeline, no changes really
        // If login, add continue as guest - allows us to set context immediately on site 
        //              Context can be default guest privileges
      path:'/',
      component: TimelineComponent
    },
    {
      path:'/login',
      component: Login
    },
    {
        path:'/signup',
        component: SignupComponent
    },
    {
        path:'/forum',
        component: ForumComponent
    },
    {
        path:'/profile',
        component: ProfileComponent
    },
    {
      path:'/*',
      component: PageNotFoundComponent
    },
  ]
   
  export default routes