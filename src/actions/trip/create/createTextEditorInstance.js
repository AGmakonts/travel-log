export const CREATE_TEXT_EDITOR_INSTANCE = 'CREATE_TEXT_EDITOR_INSTANCE';
export default function createTextEditorInstance(instance, rawContent) {
  return {
    type: CREATE_TEXT_EDITOR_INSTANCE,
    instance,
    rawContent
  }
}