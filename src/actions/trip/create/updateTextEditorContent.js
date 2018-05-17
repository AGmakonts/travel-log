export const UPDATE_TEXT_EDITOR_CONTENT = 'UPDATE_TEXT_EDITOR_CONTENT';
export default function updateTextEditorContent(editorState, instance) {

  return {
    type: UPDATE_TEXT_EDITOR_CONTENT,
    editorState,
    instance
  }

}