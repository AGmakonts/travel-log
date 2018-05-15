import {Avatar, Card, Collapse, Input, Tabs} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import changeFlickrUsernameField from '../../actions/settings/connectedAccounts/changeFlickrUsernameField';
import confirmFlickrUsername from '../../actions/settings/connectedAccounts/confirmFlickrUsername';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

class Settings extends React.Component {

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Connected accounts" key="1">
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={'Flickr'} key="1">
              <Card title={
                <Input
                  onChange={(event) => this.props.changeFlickrUsernameField(event.target.value)}
                  value={this.props.flickrFieldValue}
                  placeholder='Flickr username'
                  onBlur={() => this.props.confirmFlickrUsername(this.props.flickrFieldValue)}
                />}>
                {this.props.flickrUser && <Card.Meta
                  avatar={<Avatar src={this.props.flickrUser.avatarUrl}/>}
                  title={this.props.flickrUser.name}
                  description={this.props.flickrUser.description}
                />}

              </Card>
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
    confirmFlickrUsername
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
  confirmFlickrUsername: propTypes.func.isRequired,
  flickrFieldValue: propTypes.string.isRequired,
  flickrUser: propTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)