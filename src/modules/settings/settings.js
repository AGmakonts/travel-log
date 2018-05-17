import {Avatar, Card, Collapse, Icon, Input, Modal, Tabs} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import changeFlickrUsernameField from '../../actions/settings/connectedAccounts/changeFlickrUsernameField';
import fetchUser from '../../actions/settings/connectedAccounts/flickr/fetchUser';
import fetchUserInfo from '../../actions/settings/connectedAccounts/flickr/fetchUserInfo';
import invalidateUser from '../../actions/settings/connectedAccounts/flickr/invalidateUser';
import saveAccountsSettings from '../../actions/settings/connectedAccounts/saveAccountsSettings';

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
        actions={[<Icon onClick={this.props.invalidateUser} key='delete' type="close"/>]}
      >
        {this.props.flickrUser && this.props.flickrUser.name && <Card.Meta
          avatar={<Avatar src={this.props.flickrUser.avatarUrl}/>}
          title={this.props.flickrUser.name}
          description={this.props.flickrUser.description}
        />}
      </Card>
    );
    return (
      <Modal
        title="Your Travel Log settings"
        visible={this.props.settingsVisible}
        onCancel={this.props.onCancel}
        onOk={() => this.props.saveAccountsSettings({accounts: this.props.accountsSettings}, this.props.currentUser.uid)}
      >
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
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    changeFlickrUsernameField,
    fetchUser,
    fetchUserInfo,
    saveAccountsSettings,
    invalidateUser
  };

  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    flickrFieldValue: state.settings.accounts.flickr.fieldValue,
    flickrUser: state.settings.accounts.flickr.user,
    accountsSettings: state.settings.accounts,
    settingsVisible: !!state.settings.visible
  }
}

Settings.propTypes = {
  changeFlickrUsernameField: propTypes.func.isRequired,
  fetchUser: propTypes.func.isRequired,
  saveAccountsSettings: propTypes.func.isRequired,
  flickrFieldValue: propTypes.string.isRequired,
  flickrUser: propTypes.object,
  accountsSettings: propTypes.object,
  settingsVisible: propTypes.bool,
  fetchUserInfo: propTypes.func.isRequired,
  invalidateUser: propTypes.func.isRequired,
  onCancel: propTypes.func.isRequired,
  currentUser: propTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)