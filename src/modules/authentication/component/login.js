import {Button, Card, Col, Divider, Input, Row} from 'antd';
import propTypes from 'prop-types';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import login from '../../../actions/authentication/login';

const {Meta} = Card;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

class Login extends React.Component {
  render() {

    const form = (
      <Fragment>
        <InputGroup size="large">
          <Col span={10}>
            <Input placeholder='username'/>
          </Col>
          <Col span={10}>
            <Input placeholder='password' type='password'/>
          </Col>
          <Col span={4}>
            <Button size="large" type="primary" icon="arrow-right">Login</Button>
          </Col>
        </InputGroup>
        <Divider>Or</Divider>
        <ButtonGroup>
          <Button onClick={() => this.props.login('google')} icon='google' size='large'>Login with Google</Button>
          <Button onClick={() => this.props.login('github')} icon='github' size='large'>Login with Github</Button>
        </ButtonGroup>
      </Fragment>
    );

    return (
      <Row>
        <Col span={12} offset={6}>
          <Card>
            <Meta
              title="Login into your Travel Log"
              description={form}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    login
  };

  return bindActionCreators(actionCreators, dispatch);
}

Login.propTypes = {
  login: propTypes.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(Login));