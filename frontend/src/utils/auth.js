export const BASE_URL = 'http://localhost:3000'

function getResponseData(res) {

  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`); 
  } else {
    console.log(res);
    return res;
  }

}

export const register = (email, password) => {
  console.log(`${BASE_URL}/signup`);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, 
      password
    })
  })
   .then((res) => getResponseData(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}) 
  })
   .then((res) => getResponseData(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => getResponseData(res));
} 