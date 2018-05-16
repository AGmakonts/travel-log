import {Button, Divider, Icon, Timeline} from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cancel from '../../../../actions/trip/create/cancel';
import dismissPhotoBrowser from '../../../../actions/trip/create/dismissPhotoBrowser';
import fetchAddressDetails from '../../../../actions/trip/create/location/fetchAddressDetails';
import openPhotoBrowser from '../../../../actions/trip/create/openPhotoBrowser';
import save from '../../../../actions/trip/create/save';
import start from '../../../../actions/trip/create/start';
import switchTabInChapter from '../../../../actions/trip/create/switchTabInChapter';
import updateChapter from '../../../../actions/trip/create/updateChapter';
import Chapter from './chapter';
import PhotoBrowser from './chapterParts/photoBrowser';
import styles from './creator.css';

class Creator extends React.Component {

  componentWillUnmount() {
    this.props.cancel()
  }

  componentWillMount() {
    this.props.start(0);
  }

  renderChapters() {
    const chapters = this.props.newTrip.chapters;
    return chapters
      .map((chapter, index) => {
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
          restrictedDates={this.props.newTrip.chapters[index - 1] ? this.props.newTrip.chapters[index - 1].startDate : null}
          openPhotoBrowser={this.props.openPhotoBrowser}
          switchTabInChapter={this.props.switchTabInChapter}
          chapter={this.props.newTrip.chapters[index]}
          fetchAddressDetails={this.props.fetchAddressDetails}
          currentTab={this.props.newTrip.chapterTabs[index]}
          updateChapter={this.props.updateChapter}
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

        <PhotoBrowser onCancel={this.props.dismissPhotoBrowser}/>
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
    start,
    openPhotoBrowser,
    dismissPhotoBrowser,
    fetchAddressDetails,
    switchTabInChapter,
    updateChapter
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
  openPhotoBrowser: propTypes.func.isRequired,
  dismissPhotoBrowser: propTypes.func.isRequired,
  fetchAddressDetails: propTypes.func.isRequired,
  updateChapter: propTypes.func.isRequired,
  switchTabInChapter: propTypes.func.isRequired,
  start: propTypes.func.isRequired

};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);