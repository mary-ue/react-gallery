import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { singlePhotoRequestAsync } from '../../store/singlePhoto/singlePhotoAction';
import { removeSinglePhotoData } from '../../store/singlePhoto/singlePhotoSlice';
import s from './PhotoPage.module.css';
import { Like } from '../PhotoCard/Like/Like';
import { Loader } from '../UI/Loader/Loader';
import { removeLikesCount, removeUserLikes, setLikesCount, setUserLikes } from '../../store/likes/likesSlice';

export const PhotoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const photoData = useSelector((state) => state.singlePhotoReducer.photoData);
  const loading = useSelector((state) => state.singlePhotoReducer.loading);
  console.log(photoData);

  useEffect(() => {
    dispatch(singlePhotoRequestAsync(id));

    return () => {
      dispatch(removeSinglePhotoData());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (photoData) {
      const likedByUser = photoData.liked_by_user;
      const likes = photoData.likes;
      dispatch(setLikesCount(likes));
      dispatch(setUserLikes(likedByUser));
    }
  }, [photoData, dispatch]);

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
            <Like id={id} />
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
