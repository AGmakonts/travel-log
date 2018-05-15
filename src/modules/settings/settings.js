import {Collapse, Tabs} from 'antd';
import React from 'react';
import {connect} from 'react-redux';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

class Settings extends React.Component {

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Connected accounts" key="1">
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="Flickr" key="1">
              ok
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


export default connect()(Settings)