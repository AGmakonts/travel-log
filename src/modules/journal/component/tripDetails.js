import {Card, Col, Divider, Row, Tabs} from 'antd';
import moment from 'moment';
import propTypes from 'prop-types';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Chapter from '../../../models/Chapter';
import Trip from '../../../models/Trip';

const TabPane = Tabs.TabPane;
const {Meta} = Card;

class TripDetails extends React.Component {

  renderChapterCards = () => {
    return this.props.trip.chapters.map((chapter: Chapter, index: number) => {
      return (
        <Col span={8} key={index}>
          <Card cover={<img alt="example" src={chapter.photo.thumbnail}/>}>
            <Meta
              title={chapter.location.country}
              description={chapter.summary}
            />
          </Card>
        </Col>
      );
    })
  };

  render() {

    const trip: Trip = this.props.trip;

    return (
      <Fragment>
        <h1>{trip.title.value}</h1>
        <h3>Between {moment(trip.date).calendar()} and {moment(trip.endDate).calendar()}</h3>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
            <Divider orientation="left">Basic info</Divider>
            <Divider orientation="left">Chapters</Divider>
            <Row gutter={16}>
              {this.renderChapterCards()}
            </Row>
          </TabPane>
          <TabPane tab="Story" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="Map" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {};
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {}
}

TripDetails.propTypes = {
  trip: propTypes.instanceOf(Trip).isRequired,
  match: propTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);

