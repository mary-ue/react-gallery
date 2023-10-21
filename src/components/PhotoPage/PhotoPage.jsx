import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { singlePhotoRequestAsync } from '../../store/singlePhoto/singlePhotoAction';
import { removeSinglePhotoData } from '../../store/singlePhoto/singlePhotoSlice';
import s from './PhotoPage.module.css';
import { Like } from '../PhotoCard/Like/Like';
import { Loader } from '../UI/Loader/Loader';
import { removeLikesCount, removeUserLikes, setLikesCount, setUserLikes } from '../../store/likes/likesSlice';
import { likesRequestAsync, unlikesRequestAsync } from '../../store/likes/likesAction';
import { removePhotosData } from '../../store/photos/photosSlice';

export const PhotoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const photoData = useSelector((state) => state.singlePhotoReducer.photoData);
  const loading = useSelector((state) => state.singlePhotoReducer.loading);
  console.log(photoData);

  let likedByUser = useSelector(state => state.likesReducer.userLiked);
  let likes = useSelector(state => state.likesReducer.likes);

  const handleLikeClick = () => {
    if (likedByUser) {
      dispatch(unlikesRequestAsync(id));
      // likes -= 1;
      console.log('unlike!');
    } else {
      dispatch(likesRequestAsync(id));
      // likes += 1;
      console.log('like!');
    }
  };

  useEffect(() => {
    dispatch(singlePhotoRequestAsync(id));

    return () => {
      dispatch(removeSinglePhotoData());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (Object.keys(photoData).length > 0) {
      const newLikedByUser = photoData.liked_by_user;
      const newLikes = photoData.likes;
      dispatch(setLikesCount(newLikes));
      dispatch(setUserLikes(newLikedByUser));
    }
  }, [photoData, dispatch]);

  // useEffect(() => {
  //   if (photoData) {
  //     const newLikedByUser = photoData.liked_by_user;
  //     const newLikes = photoData.likes;

  //     if (likedByUser !== newLikedByUser) {
  //       dispatch(setUserLikes(likedByUser));
  //     }

  //     if (likes !== newLikes) {
  //       dispatch(setLikesCount(likes));
  //     }
  //   }
  // }, [photoData, dispatch, likedByUser]);

  // useEffect(() => {
  //   console.log(likes);
  //   console.log(likedByUser);
  // }, [likedByUser, likes]);

  return (
    loading ? (
      <Loader />
    ) : (
      <div className={s.photoPage}>
      {photoData && (
        <>
          <img
            src={photoData?.urls?.full}
            alt={photoData?.description || 'Unsplash Photo'}
            className={s.photo}
          />
          <div className={s.photoDetails}>
            <div className={s.authorInfo}>
              <p>
                Автор:{' '}
                <a href={photoData?.user?.portfolio_url}>{photoData?.user?.name}</a>
              </p>
              <p>
                Опубликовано:{' '}
                {new Date(photoData?.created_at).toLocaleDateString()}
              </p>
            </div>
            {
              (Object.keys(photoData).length > 0) ? (
                <Like
                  handleLikeClick={handleLikeClick}
                  id={id}
                  likes={likes}
                  likedByUser={likedByUser}
                />
              ) : (
                <div className={s.likePlaceholder}></div>
              )
            }
          </div>
          <button 
            className={s.backButton}
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </>
      )}
    </div>
    )
  );
};
