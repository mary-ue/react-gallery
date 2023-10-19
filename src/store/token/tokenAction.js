import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACCESS_KEY, REDIRECT_URI, SECRET_KEY, URL_TOKEN } from "../../api/const";

export const tokenRequestAsync = createAsyncThunk('token/fetch', 
  async (code, {getState}) => {

  const body = new URLSearchParams({
    client_id: ACCESS_KEY,
    client_secret: SECRET_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
    grant_type: 'authorization_code',
  });

  return fetch(URL_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  }).then(response => {
    // if (!response.ok) {
    //   throw new Error(`Ошибка HTTP: ${response.status}`);
    // }
    return response.json();
  }).then(data => {
    console.log('access_token: ', data.access_token);
    return data.access_token;
  })
  .catch(error => {
    console.error('Ошибка при получении токена доступа:', error);
    return error.message;
  });
});
