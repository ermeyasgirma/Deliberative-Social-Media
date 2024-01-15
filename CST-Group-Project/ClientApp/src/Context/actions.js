const ROOT_URL = 'api/authenticate';
 
export async function loginUser(dispatch, loginPayload) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
 
  try {

    dispatch({ type: 'REQUEST_LOGIN' });

    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let auth_response = await response.json();

    if (auth_response.token) {

      const token = auth_response.token;
  
      const reactions = await updateReactionLocal(dispatch, token, loginPayload.username)
    
      const data = {
        'user': {
          'username': loginPayload.username,
          'auth_level' : auth_response.permission_level
        }, // to fetch  
        'auth_token': token,
        'reactions':reactions
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: data });

      localStorage.setItem('currentUser', JSON.stringify(data));

      return data;

    } else {
     // dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
     alert("Login failed - incorrect username or password ")
     return;
    }
  
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}


async function updateReactionLocal(dispatch, token, username){

  const requestOptions = {
    headers: {'Authorization': "Bearer " + token}
  };

  const reaction_fetch = await fetch('api/Reaction/MapReactions/'+username, requestOptions)
  const reactions = await reaction_fetch.json()

  dispatch({ type: 'REACTIONS', payload: reactions });

  return reactions;

}

export async function updateReaction(dispatch, token, username){

  const requestOptions = {
    headers: {'Authorization': "Bearer " + token}
  };


  const reaction_fetch = await fetch('api/Reaction/MapReactions/'+username, requestOptions)
  const reactions = await reaction_fetch.json()

  dispatch({ type: 'REACTIONS', payload: reactions });

  const storage = JSON.parse(localStorage.getItem('currentUser'))
  storage['reactions'] = reactions

  localStorage.setItem('currentUser', JSON.stringify(storage))

  return reactions;

}

 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
}

export async function setUser(dispatch, payload) {
  try {

    if (payload) {
      dispatch({ type: 'SET_USER', payload: payload})
    }
    return;
  } catch (error) {
    dispatch({ type: 'REACTION_ERROR', error: error });
  }
}