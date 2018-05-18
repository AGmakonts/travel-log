import {EditorState} from 'draft-js';
import {CREATE_TEXT_EDITOR_INSTANCE} from '../../../actions/trip/create/createTextEditorInstance';
import {UPDATE_TEXT_EDITOR_CONTENT} from '../../../actions/trip/create/updateTextEditorContent';

export default function textEditor(state = {}, action) {

  const newState = {...state};
  switch (action.type) {

    case CREATE_TEXT_EDITOR_INSTANCE: {
      newState[action.instance] = action.rawContent ? EditorState.createWithContent(action.rawContent) : EditorState.createEmpty();
      return newState;
    }

    case UPDATE_TEXT_EDITOR_CONTENT: {
      newState[action.instance] = action.editorState;
      return newState;
    }

    default:
      return state;
  }

}