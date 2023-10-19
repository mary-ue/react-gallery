import { createAsyncThunk } from "@reduxjs/toolkit";
import { ACCESS_KEY, URL_API } from "../../api/const";

export const singlePhotoRequestAsync = createAsyncThunk('singlePhoto/fetch', 
  async (id, {getState}) => {

    const URL = `${URL_API}/photos/${id}`;

    return fetch(URL, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching photo data:', error);
      return error;
    });
  }
);