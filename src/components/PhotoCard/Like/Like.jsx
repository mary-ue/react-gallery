import { useDispatch, useSelector } from 'react-redux';
import s from './Like.module.css';
import { ReactComponent as LikeIcon } from './img/like.svg';
import { useEffect, useState } from 'react';
import { likesRequestAsync, unlikesRequestAsync } from '../../../store/likes/likesAction';
import { setLikesCount, setUserLikes } from '../../../store/likes/likesSlice';

export const Like = ({ id, likes, likedByUser, handleLikeClick }) => {

  return (
    <button
      className={s.button}
      onClick={handleLikeClick}
    >
      {/* <LikeIcon className={s.likesIcon} /> */}
      <LikeIcon className={`${s.likesIcon} ${likedByUser ? s.liked : ''}`} />
      <div className={s.likesCount}>{likes}</div>
    </button>
  );
};