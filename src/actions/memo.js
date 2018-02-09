import * as actions from './ActionTypes';
import axios from 'axios';

/* MEMO POST */
export function memoPostRequest(contents) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(memoPost());
    // API request
    return axios.post('/api/memo', { contents })
      .then((response) => {
        dispatch(memoPostSuccess());
      }).catch((error) => {
        dispatch(memoPostFailure(error));
      });
  }
}

export function memoPost() {
    return {
        type: actions.MEMO_POST
    };
}

export function memoPostSuccess() {
    return {
        type: actions.MEMO_POST_SUCCESS
    };
}

export function memoPostFailure(error) {
    return {
        type: actions.MEMO_POST_FAILURE,
        error
    };
}

/* COMMENT POST */
export function commentPostRequest(contents, memoId, index) {

  const data = {
    contents,
    memoId
  };

  return (dispatch) => {
    // Inform Login API is starting
    dispatch(commentPost());
    // API request
    return axios.post('/api/comment', data)
      .then((response) => {
        dispatch(commentPostSuccess(response.data, index));
      }).catch((error) => {
        dispatch(commentPostFailure(error));
      });
  }
}

export function commentPost() {
    return {
        type: actions.COMMENT_POST
    };
}

export function commentPostSuccess(data, index) {
    return {
        type: actions.COMMENT_POST_SUCCESS,
        index,
        data
    };
}

export function commentPostFailure(error) {
    return {
        type: actions.COMMENT_POST_FAILURE,
        error
    };
}

/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' memo or 'new' memo
        - id:        OPTIONAL; memo id (one at the bottom or one at the top)
        - username:  OPTIONAL; find memos of following user
*/
export function memoListRequest(isInitial, listType, id, username) {

  return (dispatch) => {
      // inform memo list API is starting
      dispatch(memoList());

      let url = '/api/memo';

      if(typeof username==="undefined") {
        // username not given, load public memo
        url = isInitial ? url : `${url}/${listType}/${id}`;
        // or url + '/' + listType + '/' +  id
      } else {
        // load memos of specific user
        url = isInitial ? `${url}/${username}` : `${url}/${username}/${listType}/${id}`;
      }
      return axios.get(url)
      .then((response) => {
          dispatch(memoListSuccess(response.data, isInitial, listType));
      }).catch((error) => {
          dispatch(memoListFailure());
      });
  };
}

export function memoList() {
    return {
        type: actions.MEMO_LIST
    };
}

export function memoListSuccess(data, isInitial, listType) {
    return {
        type: actions.MEMO_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function memoListFailure() {
    return {
        type: actions.MEMO_LIST_FAILURE
    };
}

/* MEMO EDIT POST */
export function memoEditPostRequest(id, index, contents) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(memoEditPost());
    // API request
    return axios.put(`/api/memo/${id}`, { contents })
      .then((response) => {
        dispatch(memoEditPostSuccess(index, response.data.memo));
      }).catch((error) => {
        dispatch(memoEditPostFailure(error.response.data.code));
      });
  }
}

export function memoEditPost() {
    return {
        type: actions.MEMO_EDIT_POST
    };
}

export function memoEditPostSuccess(index, memo) {
    return {
        type: actions.MEMO_EDIT_POST_SUCCESS,
        index,
        memo
    };
}

export function memoEditPostFailure(error) {
    return {
        type: actions.MEMO_EDIT_POST_FAILURE,
        error
    };
}

/* MEMO DELETE POST */
export function memoDeletePostRequest(id, index) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(memoDeletePost());
    // API request
    return axios.delete(`/api/memo/${id}`)
      .then((response) => {
        dispatch(memoDeletePostSuccess(index));
      }).catch((error) => {
        dispatch(memoDeletePostFailure(error.response.data.code));
      });
  }
}

export function memoDeletePost() {
    return {
        type: actions.MEMO_REMOVE
    };
}

export function memoDeletePostSuccess(index) {
    return {
        type: actions.MEMO_REMOVE_SUCCESS,
        index,
    };
}

export function memoDeletePostFailure(error) {
    return {
        type: actions.MEMO_REMOVE_FAILURE,
        error
    };
}

/* MEMO TOGGLE STAR */
export function memoStarRequest(id, index) {
  return (dispatch) => {
    // TO BE IMPLEMENTED
    return axios.post('/api/memo/star/' + id)
    .then((response) => {
      dispatch(memoStarSuccess(index, response.data.memo));
    }).catch((error) => {
      dispatch(memoStarFailure(error.response.data.code));
    });
  };
}

export function memoStar() {
  return {
    type: actions.MEMO_STAR
  };
}

export function memoStarSuccess(index, memo) {
  return {
    type: actions.MEMO_STAR_SUCCESS,
    index,
    memo
  };
}

export function memoStarFailure(error) {
  return{
    type: actions.MEMO_STAR_FAILURE,
    error
  };
}
