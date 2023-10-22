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
import { likePhoto, unlikePhoto } from '../../store/photos/photosSlice';

export const PhotoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const photos = useSelector((state) => state.photosReducer.photos);
  const photoItem = photos.find((photo) => photo.id === id);
  const photoData = useSelector((state) => state.singlePhotoReducer.photoData);
  const loading = useSelector((state) => state.singlePhotoReducer.loading);
  const likedByUser = useSelector((state) => state.likesReducer.userLiked);
  const likes = useSelector((state) => state.likesReducer.likes);

  const handleLikeClick = () => {
    if (likedByUser) {
      dispatch(unlikesRequestAsync(id));
      console.log('unlike!');
      dispatch(unlikePhoto({id}));
    } else {
      dispatch(likesRequestAsync(id));
      console.log('like!');
      dispatch(likePhoto({id}));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(singlePhotoRequestAsync(id));
    }

    return () => {
      dispatch(removeSinglePhotoData());
      dispatch(removeLikesCount());
      dispatch(removeUserLikes());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (Object.keys(photoData).length > 0) {
      const newLikedByUser = photoItem?.liked_by_user || photoData.liked_by_user;
      const newLikes = photoData.likes;
      if (likes == 0) {
        dispatch(setLikesCount(newLikes));
        dispatch(setUserLikes(newLikedByUser));
      }
    }
  }, [photoData, dispatch]);

  useEffect(() => {
    console.log(photoData);
  }, [photoData]);

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
              {(Object.keys(photoData).length > 0) ? (
                <Like
                  handleLikeClick={handleLikeClick}
                  id={id}
                  likes={likes}
                  likedByUser={likedByUser}
                />
              ) : (
                <div className={s.likePlaceholder}></div>
              )}
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
