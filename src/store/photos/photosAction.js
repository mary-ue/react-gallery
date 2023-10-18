import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../api/const";

export const photosRequestAsync = createAsyncThunk('photos/fetch', 
  async (data, {getState}) => {

    const {token, page} = data;

    const URL = `${URL_API}/photos?page=${page}&per_page=30`;

    return fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      // if (!response.ok) {
      //   throw new Error(`Ошибка HTTP: ${response.status}`);
      // }
      return response.json();
    })
    .then(data => {
      // console.log('Photos data: ', data);
      return data;
    })
    .catch(error => {
      console.error('Ошибка при получении данных о фотографиях:', error);
      return error;
    });
  }
);
