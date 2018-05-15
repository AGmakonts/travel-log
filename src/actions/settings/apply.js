import {APPLY} from './actionTypes';

export default function apply(data) {
  return {
    type: APPLY,
    payload: data
  }
}