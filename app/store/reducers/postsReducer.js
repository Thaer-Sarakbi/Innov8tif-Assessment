import { GET_POSTS, GET_POSTS_DETAILS } from '../types'

const initialState = {
    posts: [],
    page: 1,
    isLoading: false
  }; 

const postsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_POSTS:
            return {
              ...state,
              posts: state.posts.concat(action.payload.posts),
              page: action.payload.page,
              isLoading: action.payload.isLoading
            };
        case GET_POSTS_DETAILS:
            return {
              ...state,
              posts: action.payload.posts
            };
        default:
            return state;
    }
}

export default postsReducer