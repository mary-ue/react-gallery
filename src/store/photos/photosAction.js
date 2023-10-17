import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../api/const";

export const photosRequestAsync = createAsyncThunk('photos/fetch', 
  async (perPage, {getState}) => {
    // console.log('0');
    const token = getState().tokenReducer.token;
    // console.log(token);
    const page = getState().photosReducer.page;
    // console.log(page);

    // console.log('1');

    const URL = `${URL_API}/photos?page=${page}&per_page=${perPage}&order_by=lates`;

    // console.log('2');

    return fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Photos data: ', data);
      return data;
    })
    .catch(error => {
      console.error('Ошибка при получении данных о фотографиях:', error);
      return error.message;
    });
  }
);