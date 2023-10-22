import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACCESS_KEY, URL_API } from "../../api/const";

export const singlePhotoRequestAsync = createAsyncThunk('singlePhoto/fetch', 
  async (id, {getState}) => {

    const uniqueParam = `timestamp=${Date.now()}`;
    const URL = `${URL_API}/photos/${id}?${uniqueParam}`;

    return fetch(URL, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
        // 'Cache-Control': 'no-cache',
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('singlePhotoRequestAsync: ', data);
      return data;
    })
    .catch(error => {
      console.error('Error fetching photo data:', error);
      return error;
    });
  }
);