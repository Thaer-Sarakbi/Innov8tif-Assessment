import { GET_POSTS, GET_POSTS_DETAILS } from '../types'
import api from '../../api/api'
 
export const getPosts = (loading, page) => (dispatch) => {
          
    api.get(`posts?_pagination=true&_pageSize=10&_page=${page}`).then((response) =>{
        if (response && response.status == "200") {
          dispatch({   
            type: GET_POSTS, 
            payload: {
              posts: response.data,
              page,
              isLoading: loading
            }  
          })    
         }  else {  
          console.log(JSON.stringify(response))
        }  
      }) 
}

export const getPostDetails = (userId) => (dispatch) => {
        
  api.get(`posts?userId=${userId}`).then((response) =>{
      if (response && response.status == "200") {
        dispatch({   
          type: GET_POSTS_DETAILS, 
          payload: {
            posts: response.data
          }  
        })    
       }  else {  
        console.log(JSON.stringify(response))
      }  
    }) 
}