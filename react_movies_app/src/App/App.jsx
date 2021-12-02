import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, Header } from '../_components';
import { UsersPage } from '../containers/UsersPage';
import { LoginPage } from '../containers/LoginPage';
import { RegisterPage } from '../containers/RegisterPage';
import { MoviesPage } from '../containers/MoviesPage';
import { MoviePage } from '../containers/MoviePage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }
    
    render() {
        const { alert, user } = this.props;
        
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Header user={user}/>
                            <Switch>
                                <Route path="/login" component={LoginPage} />
                                <PrivateRoute exact path="/" component={MoviesPage} />
                                <PrivateRoute path="/movie" component={MoviePage} />
                                <PrivateRoute path="/users" component={UsersPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    let user = JSON.parse(localStorage.getItem('user'));
    return { alert, user };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };