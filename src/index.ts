import { reduxLeaves } from "./reduxLeaves";
import { getState, updateState, resetState } from './utils/index';
import { makeActionCreator } from './actions/creators/make/makeActionCreator';

export {
  makeActionCreator,
  getState,
  resetState,
  updateState
}

export default reduxLeaves