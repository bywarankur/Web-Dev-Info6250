export const checkSession = () => {
    return fetch('/api/session',  {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
  };
  
  export const createSession = ({username}) => {
    return fetch('/api/session',  {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
  };

  export function fetchLogin(username) {

    console.log("infetch login:" + username)
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  export function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }


  
  export const endSession = () => {
    return fetch('/api/session',  {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
  };