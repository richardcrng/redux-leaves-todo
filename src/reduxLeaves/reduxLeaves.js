import _ from 'lodash';
import { recursivelyAddActions } from '../addActions';
import { recursivelyGeneratePaths, addActionsDeep } from '../addActions/addActions';

export const reduxLeaves = (initialState) => {
  const reducer = (state = initialState, action) => {
    return state
  }

  const paths = recursivelyGeneratePaths(initialState)
  const actions = addActionsDeep(initialState, paths)

  return [reducer, actions]
}