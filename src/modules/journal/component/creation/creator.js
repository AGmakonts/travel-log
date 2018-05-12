import {Button, Divider, Icon, Timeline} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cancel from '../../../../actions/trip/create/cancel';
import save from '../../../../actions/trip/create/save';
import start from '../../../../actions/trip/create/start';
import Chapter from './chapter';
import styles from './creator.css';

class Creator extends React.Component {

  componentWillUnmount() {
    this.props.cancel()
  }

  componentWillMount() {
    this.props.start(0);
  }

  renderChapters() {
    const chapterLocations = this.props.newTrip.chapterLocations;
    return chapterLocations
      .map((location, index) => {
        return this._renderChapterDividerPair(index);
      })
      .flatMap(element => element);
  }

  /**
   *
   * @param index
   * @return {*[]}
   * @private
   */
  _renderChapterDividerPair = (index) => {
    const chapter = (
      <Timeline.Item key={`chapter-${index}`} dot={<Icon type="environment" style={{fontSize: '16px'}}/>}>
        <Chapter
          index={index}
          restrictedDates={this.props.newTrip.chapterDates[index - 1] ? this.props.newTrip.chapterDates[index - 1].end : null}
        />
      </Timeline.Item>
    );

    const divider = (
      <Timeline.Item key={`space-${index}`} dot={<Icon type="arrow-down" style={{fontSize: '16px'}}/>} color="black">
        <div onClick={() => this.props.start(index + 1)}>
          <Divider dashed><Icon type="plus-circle-o"/> Add chapter</Divider>
        </div>
      </Timeline.Item>
    );

    return [chapter, divider]
  };

  /**
   *
   * @return {*}
   */
  render() {

    return (
      <div>
        <h2 className={styles.toolbar}>
          Create new trip!
          <div>
            <Button type="danger" shape="circle" icon="delete" size='large'/>
            <Button type="primary" shape="circle" icon="save" size='large'
              onClick={() => this.props.save(this.props.newTrip)}/>
          </div>
        </h2>

        <Timeline>
          <Timeline.Item>
            <Divider dashed><Icon type="plus-circle-o"/> Add travel info</Divider>
          </Timeline.Item>
          {this.renderChapters()}
        </Timeline>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    cancel,
    save,
    start
  };
  return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    newTrip: state.trips.newTrip
  }
}

Creator.propTypes = {
  newTrip: propTypes.object,
  cancel: propTypes.func.isRequired,
  save: propTypes.func.isRequired,
  start: propTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);