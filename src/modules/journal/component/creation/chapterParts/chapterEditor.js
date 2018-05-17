/* eslint react/prop-types: 0 */
import {Popover} from 'antd';
import {convertToRaw} from 'draft-js';
import {
  BlockquoteButton,
  BoldButton,
  CodeBlockButton,
  CodeButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton
} from 'draft-js-buttons';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';
import Editor from 'draft-js-plugins-editor';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import propTypes from 'prop-types';
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import createTextEditorInstance from '../../../../../actions/trip/create/createTextEditorInstance';
import updateTextEditorContent from '../../../../../actions/trip/create/updateTextEditorContent';

const sideToolbarPlugin = createSideToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});
const {SideToolbar} = sideToolbarPlugin;
const linkifyPlugin = createLinkifyPlugin();


class ChapterEditor extends React.Component {

  _instanceKey: number;


  constructor(props) {
    super(props);
    this._instanceKey = Date.now().toString();
  }

  get editorState() {
    return this.props.editorState[this._instanceKey];
  }

  componentWillMount() {
    this.props.createTextEditorInstance(this._instanceKey);
  }

  customDecorators = [
    {
      strategy: (contentBlock, callback, contentState) => {

        const text = contentBlock.getText();
        let matchArr, start;
        let regExp = /[A-Z]{3}/g;

        while ((matchArr = regExp.exec(text)) != null) {
          start = matchArr.index;
          callback(start, start + matchArr[0].length);

        }

      },
      component: (props) => {
        return (
          <span>
            <Popover content={<div>Airport {props.children}</div>} title="Title">{props.children}</Popover>
          </span>);
      }
    }

  ];

  render() {
    return (

      this.editorState ?
        <Fragment>
          <div style={{position: 'relative'}}>
            <Editor decorators={this.customDecorators} editorState={this.editorState}
              onChange={(state) => {
                this.props.updateTextEditorContent(state, this._instanceKey);
                console.log(convertToRaw(state.getCurrentContent()))
              }}
              plugins={[sideToolbarPlugin, linkifyPlugin]}>
              <button onClick={console.log}>Bold</button>
            </Editor>
            <SideToolbar/>
          </div>
        </Fragment> : <span></span>
    )
  }
}


ChapterEditor.propTypes = {
  editorState: propTypes.object,
  onChange: propTypes.func,
  createTextEditorInstance: propTypes.func,
  updateTextEditorContent: propTypes.func
};

function mapStateToProps(state) {
  return {
    editorState: state.trips.newTrip.textEditor
  }
}

function mapDispatchToProps(dispatch) {

  const actionCreators = {
    createTextEditorInstance,
    updateTextEditorContent
  };
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterEditor);