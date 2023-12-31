import { Link } from 'react-router-dom';
import formatDate from '../../utils/formateDate';
import s from './PhotoCard.module.css';
import { Like } from './Like/Like';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLikesCount, setUserLikes } from '../../store/likes/likesSlice';
import { likesRequestAsync, unlikesRequestAsync } from '../../store/likes/likesAction';

export const PhotoCard = ({photo}) => {
  const dispatch = useDispatch();
  const {
    id,
    user,
    // profileUrl,
    urls,
    alt_description,
    created_at,
  } = photo;

  let { likes, liked_by_user: likedByUser } = photo;

  return (
    <div className={s.photoCard} target="_blank" rel="noopener noreferrer">
      <Link to={`photos/${id}`} >
        {urls && urls?.small && (
          <img src={urls.small} alt={alt_description} className={s.photoCardImage} />
        )}
      </Link>
      <div className={s.photoCardDetails}>
        <div className={s.photoCardAuthor}>
          {user && user.links && (
            <a href={user.links.html}>
              <span>{user.username}</span>
            </a>
          )}
        </div>
        <div className={s.photoCardInfo}>
          <span className={s.photoCardDate}>{formatDate(created_at)}</span>
          <Like id={id} likes={likes} likedByUser={likedByUser} />
        </div>
      </div>
    </div>
  );
};
