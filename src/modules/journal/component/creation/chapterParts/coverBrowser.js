import {Card} from 'antd';
import React from 'react';
import styles from './coverBrowser.css';

export default class CoverBrowser extends React.Component {

  render() {
    return (
      <Card title="Select cover">
        <Card.Grid className={styles.gridStyle}>Content</Card.Grid>
      </Card>
    );
  }

}