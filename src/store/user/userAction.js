import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_USER } from "../../api/const";


export const userRequestAsync = createAsyncThunk('user/fetch', 
  async(token, {getState}) => {

    if (!token) return;

    return fetch(URL_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    }).then(data => {
      console.log('user data: ', data);
      const name = data.name;
      const img = data.profile_image.medium;
      return { name, img };
    })
    .catch(error => {
      console.error('Ошибка при получении токена доступа:', error);
      return error.message;
    });
  });



