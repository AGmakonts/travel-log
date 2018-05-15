import {LOGIN} from './actionTypes';

export default function login(provider: String, data: any = null) {
  return {
    type: LOGIN,
    payload: {
      provider,
      data
    }
  }
}