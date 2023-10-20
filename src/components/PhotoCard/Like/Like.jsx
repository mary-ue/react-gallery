import { useDispatch, useSelector } from 'react-redux';
import s from './Like.module.css';
import { ReactComponent as LikeIcon } from './img/like.svg';
import { useEffect, useState } from 'react';
import { likesRequestAsync, unlikesRequestAsync } from '../../../store/likes/likesAction';
import { setLikesCount, setUserLikes } from '../../../store/likes/likesSlice';

export const Like = ({ id, likes, likedByUser }) => {
  const dispatch = useDispatch();
  // console.log('liked: ', likedByUser);
  const likedByUserData = useSelector(state => state.likesReducer.userLiked);
  let likedInfo;
  if (likedByUser) {
    likedInfo = likedByUser;
  } else {
    likedInfo = likedByUserData;
  }

  const likesCount = useSelector(state => state.likesReducer.likes);
  let likesData;
  if(likes) {
    likesData = likes;
  } else {
    likesData = likesCount;
  }
  // const [isLiked, setIsLiked] = useState(likedByUser);
  // const [likesPhoto, setLikesPhoto] = useState(likesCount);

  const handleLikeClick = () => {
    // dispatch(setLikesCount(likes));
    // dispatch(setUserLikes(likedByUser));

    if (likedInfo) {
      dispatch(unlikesRequestAsync(id));
      // setLikesPhoto((prevLikes) => prevLikes - 1);
      console.log('unlike!');
    } else {
      dispatch(likesRequestAsync(id));
      // setLikesPhoto((prevLikes) => prevLikes + 1);
      console.log('like!');
    }

    // setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  // useEffect(() => {
  //   console.log('likedByUser: ', likedByUser);
  // }, [likedByUser]);

  // useEffect(() => {
  //   setLikesPhoto(likesCount);
  //   console.log('likes count: ', likesCount);
  // }, [likesCount]);

  // useEffect(() => {
  //   setIsLiked(isLikedByUser);
  //   console.log('is Liked by user: ', isLikedByUser);
  // }, [likedByUser]);

  return (
    <button
      className={s.button}
      onClick={handleLikeClick}
    >
      <LikeIcon className={s.likesIcon} />
      <div className={s.likesCount}>{likesData}</div>
    </button>
  );
};