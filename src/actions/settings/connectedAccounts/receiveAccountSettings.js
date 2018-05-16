export const SETTINGS_RECEIVE = 'SETTINGS_RECEIVE';
export default function receiveAccountSettings(settings) {
  return {
    type: SETTINGS_RECEIVE,
    settings
  }
}