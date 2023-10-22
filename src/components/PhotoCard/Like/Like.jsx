import { useDispatch, useSelector } from 'react-redux';
import s from './Like.module.css';
import { ReactComponent as LikeIcon } from './img/like.svg';
import { useEffect, useState } from 'react';
import { likesRequestAsync, unlikesRequestAsync } from '../../../store/likes/likesAction';
import { setLikesCount, setUserLikes } from '../../../store/likes/likesSlice';
import cn from 'classnames';

// className={isFavorite? cn(s.like, s.active) : s.like}

export const Like = ({ id, likes, likedByUser, handleLikeClick }) => {

  const token = useSelector(state => state.tokenReducer.token);
  const isSinglePhotoPage = window.location.pathname.includes(`photos/${id}`);

  // const likes = useSelector(state => state.likesReducer.likes);
  // const likedByUser = useSelector(state => state.likesReducer.userLiked);

  return (
    <button
      className={s.button}
      onClick={() => {
        if (token && isSinglePhotoPage) {
          handleLikeClick();
        }
      }}
      disabled={ isSinglePhotoPage && token ? false : true}
    >
      {/* <LikeIcon className={s.likesIcon} /> */}
      <LikeIcon 
        className={likedByUser ? cn(s.likesIcon, s.liked) : s.likesIcon}
        />
      <div className={s.likesCount}>{likes}</div>
    </button>
  );
};