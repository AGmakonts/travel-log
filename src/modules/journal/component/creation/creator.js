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
          restrictedDates={this._calculateRestrictedDatesForChapter(index)}
          openPhotoBrowser={(intent) => this.props.openPhotoBrowser(intent, index)}
          switchTabInChapter={(to) => this.props.switchTabInChapter(to, index)}
          fetchAddressDetails={(chapter, lat, lng) => this.props.fetchAddressDetails(chapter, lat, lng, index)}
          chapter={this.props.newTrip.chapters[index]}
          currentTab={this.props.newTrip.chapterTabs[index]}
          updateChapter={(chapter) => this.props.updateChapter(chapter, index)}
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
   * @param index
   * @return {*}
   * @private
   */
  _calculateRestrictedDatesForChapter(index) {
    return this.props.newTrip.chapters[index - 1] ? this.props.newTrip.chapters[index - 1].startDate : null;
  }

  /**
   *
   * @return {*}
   */
  render() {

    return (
      <div>
        {this.props.newTrip.photoBrowser.visible &&
        <PhotoBrowser
          onCancel={this.props.dismissPhotoBrowser}
          flickrUser={this.props.flickrUser}
          chapter={this.props.newTrip.photoBrowser.forChapter}
          target={this.props.newTrip.photoBrowser.targetSection}
        />}

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
    newTrip: state.trips.newTrip,
    flickrUser: state.settings.accounts.flickr.user ? state.settings.accounts.flickr.user.id : null,
  }
}

Creator.propTypes = {
  newTrip: propTypes.object,
  flickrUser: propTypes.string,
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