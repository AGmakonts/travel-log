import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router';

class PrivateRoute extends React.Component {

  render() {
    const Component = this.props.component;
    const authenticated = this.props.isAuthenticated;

    return (
      <Route
        path={this.props.path}
        render={props =>
          authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: this.props.redirect,
                state: {from: props.location}
              }}
            />
          )
        }
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: propTypes.func.isRequired,
  redirect: propTypes.string.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  path: propTypes.string
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.currentUser !== null && state.currentUser !== undefined
  }
};

export default connect(mapStateToProps)(PrivateRoute);