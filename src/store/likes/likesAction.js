import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL_API } from '../../api/const';

export const likesRequestAsync = createAsyncThunk(
  'likes/fetch',
  async (photoId, { getState, dispatch }) => {
    const token = getState().tokenReducer.token;

    if (!token) return;

    return fetch(`${URL_API}/photos/${photoId}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`Error liking photo: ${response.statusText}`);
        // }
        return response.json();
      })
      .then(data => {
        console.log('Likes data: ', data);
        // dispatch(singlePhotoRequestAsync(photoId));
        return data;
      })
      .catch((error) => {
        console.error('Error liking photo:', error);
        return error;
      });
  }
);

export const unlikesRequestAsync = createAsyncThunk(
  'unlikes/fetch',
  async (photoId, { getState }) => {
    const token = getState().tokenReducer.token;

    return fetch(`${URL_API}/photos/${photoId}/like`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`Error unliking photo: ${response.statusText}`);
        // }
        return response.json();
      })
      .then(data => {
        console.log('UNLikes data: ', data);
        return data;
      })
      .catch((error) => {
        console.error('Error unliking photo:', error);
        return error;
      });
  }
);
