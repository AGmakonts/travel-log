import {Card, DatePicker, Icon} from 'antd';
import moment from 'moment';
import propTypes from 'prop-types';
import React, {Fragment} from 'react';
import ChapterModel from '../../../../models/Chapter';
import styles from './chapter.css';
import BasicInfo from './chapterParts/basicInfo';
import Cover from './chapterParts/cover';
import Map from './chapterParts/map';

const {RangePicker} = DatePicker;


class Chapter extends React.Component {

  /**
   *
   * @return {ChapterModel|*}
   */
  get model(): ChapterModel {
    return this.props.chapter;
  }

  updateChapter = (chapter: ChapterModel) => {
    this.props.updateChapter(chapter);
  };

  /**
   *
   * @param current
   * @return {*|boolean}
   */
  disabledDate = (current) => {
    return current && current < this.props.restrictedDates;
  };

  /**
   *
   * @return {*}
   */
  render() {

    const coordinates = this.model.location;

    const tabList = [{
      key: 'basic',
      tab: 'Basic info'
    }, {
      key: 'editor',
      tab: 'Chapter editor'
    }];

    const contentList = {
      basic: <BasicInfo summary={this.model.summary} onChange={event => {
        this.updateChapter(this.model.withSummary(event))
      }}/>,
      editor: <p>content2</p>
    };

    const actions = [<Icon key={1} type="save"/>];
    const map = (
      <Map onClick={(lat, lng) => this.props.fetchAddressDetails(this.model, lat, lng)}
        coordinates={this.model.location}/>
    );

    const cover = (
      <Cover src={this.props.chapter.photo} onSelectionIntent={() => this.props.openPhotoBrowser('cover')}/>
    );

    const title = (
      <div className={styles.title}>
        {coordinates.formatted || 'Add chapter!'}
        <RangePicker disabledDate={this.disabledDate} defaultValue={[moment(), moment()]}
          onChange={event => {
            this.updateChapter(this.model.withDates(event[0], event[1]));
          }}/>
      </div>
    );

    return (
      <Fragment>

        <Card
          cover={this.props.currentTab === 'basic' ? map : cover}
          actions={actions}
          title={title}
          tabList={tabList}
          onTabChange={event => this.props.switchTabInChapter(event)}
          defaultActiveTabKey='basic'
          activeTabKey={this.props.currentTab}
        >
          {contentList[this.props.currentTab]}
        </Card>
      </Fragment>
    );
  }

}


Chapter.propTypes = {
  chapter: propTypes.instanceOf(ChapterModel),
  restrictedDates: propTypes.object,
  fetchAddressDetails: propTypes.func.isRequired,
  updateChapter: propTypes.func.isRequired,
  switchTabInChapter: propTypes.func.isRequired,
  openPhotoBrowser: propTypes.func,
  currentTab: propTypes.string
};

export default Chapter;