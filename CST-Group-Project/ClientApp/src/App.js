import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom' 
import routes from './Config/routes.js'
import { AuthProvider } from './Context/index.js';
import './custom.css'
import PageNotFoundComponent from './Pages/PageNotFound'
import TimelineComponent from './Pages/Timeline'
import ForumComponent from './Pages/Forum'
import ProfileComponent from './Pages/Profile'
import SignupComponent from './Pages/Signup'
import Login from './Pages/Login';
import Reset from './Pages/Login/reset';
import HistoryComponent from './Pages/Profile/History';


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <AuthProvider>
        <div>
          <Route exact path='/' component={TimelineComponent} />
          <Route path='/forum' component={ForumComponent} />
          <Route path='/timeline' component={TimelineComponent} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignupComponent} />
          <Route path='/profile' component={ProfileComponent} />
          <Route path='/reset' component={Reset}/>
          <Route path='/history' component={HistoryComponent} />
        </div>
      </AuthProvider>
    );
  }
}

/*
Different Approach I couldn't get working

      <Router>
				<Switch>
					{routes.map((route) => (
						<AppRoute
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
						/>
					))}
				</Switch>
			</Router>

*/