import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from 'react-masonry-css';
import { photosRequestAsync } from '../../store/photos/photosAction';
import s from './Main.module.css';
import { PhotoCard } from '../PhotoCard/PhotoCard';
import { Loader } from '../UI/Loader/Loader';

export const Main = () => {
  const dispatch = useDispatch();
  // const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const token = useSelector((state) => state.tokenReducer.token);
  const photos = useSelector((state) => state.photosReducer.photos);
  const loading = useSelector((state) => state.photosReducer.loading);
  const page = useSelector((state) => state.photosReducer.page);
  const endList = useRef(null);
  console.log(photos);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // useEffect(() => {
  //   if (token && page === 1) {
  //     dispatch(photosRequestAsync({ token, page }));
  //   }
  // }, [dispatch, token, page]);

  useEffect(() => {
    if (endList.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries &&
            entries.length > 0 &&
            entries[0].isIntersecting &&
            endList.current &&
            !loading
          ) {
            dispatch((dispatch, getState) => {
              const currentPage = getState().photosReducer.page;
              dispatch(photosRequestAsync({ token, page: currentPage + 1 }));
            });
          }
        },
        {
          rootMargin: '100px',
        }
      );
      observer.observe(endList.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [endList.current, dispatch, loading]);

  useEffect(() => {
    console.log(page);
  }, [page])

  return (
    <>
      {loading && (page === 1) ? (
        <Loader size={20} />
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos &&
            photos?.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
        </Masonry>
      )}
      <div ref={endList} className={s.end}></div>
    </>
  );
};
