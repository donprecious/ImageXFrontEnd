import { SIGNEDIN } from './actions';
import { createReducer, on } from '@ngrx/store';

export interface IAppState {
  isSignedIn: boolean;
  others: string;
}

export const INITIAL_STATE: IAppState = {
  isSignedIn : false,
  others: ""
 };

const _rootReducer = createReducer(INITIAL_STATE,
  on(SIGNEDIN, state =>  (  { ...state, isSignedIn: false, others: "small"}))

);

export function approotReducer(state: IAppState |undefined, action) {

  _rootReducer(state, action);
}
