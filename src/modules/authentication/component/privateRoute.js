import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router';

class PrivateRoute extends React.Component {

  render() {
    const Component = this.props.component;
    const authenticated = this.props.isAuthenticated;
    const invert = this.props.invert;
    const allow = !invert ? authenticated : !authenticated;

    return (
      <Route
        path={this.props.path}
        exact={this.props.exact}
        render={props =>
          allow ? (
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

PrivateRoute.defaultProps = {
  invert: false,
  exact: false
};

PrivateRoute.propTypes = {
  component: propTypes.func.isRequired,
  redirect: propTypes.string.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  path: propTypes.string,
  invert: propTypes.bool,
  exact: propTypes.bool
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.currentUser !== null && state.currentUser !== undefined
  }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));