import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* SEARCH */
export function searchRequest(username) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(search());
    // API request
    return axios.get(`/api/account/search/${username}`)
      .then((response) => {
        dispatch(searchSuccess(response.data));
      }).catch((error) => {
        dispatch(searchFailure(error));
      });
  }
}

export function search() {
    return {
        type: SEARCH
    };
}

export function searchSuccess(data) {
    return {
        type: SEARCH_SUCCESS,
        data
    };
}

export function searchFailure(error) {
    return {
        type: SEARCH_FAILURE,
        error
    };
}
