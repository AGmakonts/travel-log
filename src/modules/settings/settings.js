import {Avatar, Card, Collapse, Icon, Input, Tabs} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import changeFlickrUsernameField from '../../actions/settings/connectedAccounts/changeFlickrUsernameField';
import fetchUser from '../../actions/settings/connectedAccounts/flickr/fetchUser';
import fetchUserInfo from '../../actions/settings/connectedAccounts/flickr/fetchUserInfo';
import invalidateUser from '../../actions/settings/connectedAccounts/flickr/invalidateUser';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

class Settings extends React.Component {

  componentDidMount() {
    this.props.flickrUser && this.props.fetchUserInfo(this.props.flickrUser.id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.flickrUser && this.props.flickrUser || this.props.flickrUser && this.props.flickrUser.id !== prevProps.flickrUser.id) {
      this.props.fetchUserInfo(this.props.flickrUser.id);
    }
  }

  render() {
    const input = (
      <Input
        onChange={(event) => this.props.changeFlickrUsernameField(event.target.value)}
        value={this.props.flickrFieldValue}
        placeholder='Flickr username'
        onBlur={() => this.props.fetchUser(this.props.flickrFieldValue)}
      />);


    const userCard = (
      <Card
        actions={[<Icon onClick={this.props.invalidateUser} key='delete' type="close" />]}
      >
        {this.props.flickrUser && this.props.flickrUser.name && <Card.Meta
          avatar={<Avatar src={this.props.flickrUser.avatarUrl}/>}
          title={this.props.flickrUser.name}
          description={this.props.flickrUser.description}
        />}
      </Card>
    );
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Connected accounts" key="1">
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={'Flickr'} key="1">
              {this.props.flickrUser === null || !this.props.flickrUser.name ? input : userCard}
            </Panel>
            <Panel header="Google" key="2">
              ok
            </Panel>
            <Panel header="Facebook" key="3">
              ok
            </Panel>
            <Panel header="Github" key="4">
              ok
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="Privacy" key="2">Content of Tab Pane 2</TabPane>
      </Tabs>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    changeFlickrUsernameField,
    fetchUser,
    fetchUserInfo,
    invalidateUser
  };

  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    flickrFieldValue: state.settings.accounts.flickr.fieldValue,
    flickrUser: state.settings.accounts.flickr.user
  }
}

Settings.propTypes = {
  changeFlickrUsernameField: propTypes.func.isRequired,
  fetchUser: propTypes.func.isRequired,
  flickrFieldValue: propTypes.string.isRequired,
  flickrUser: propTypes.object,
  fetchUserInfo: propTypes.func.isRequired,
  invalidateUser: propTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)