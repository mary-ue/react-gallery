import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry from 'react-masonry-css';
import { photosRequestAsync } from "../../store/photos/photosAction";
import s from './Main.module.css';
import { PhotoCard } from "../PhotoCard/PhotoCard";

export const Main = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token);
  const photos = useSelector(state => state.photosReducer.photos);
  const loading = useSelector(state => state.photosReducer.loading);
  const page = useSelector(state => state.photosReducer.page);
  const endList = useRef(null);
  console.log(photos);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  
  useEffect(() => {
    if (token) {
      dispatch(photosRequestAsync({token, page}));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (endList.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries && entries.length > 0 &&
          entries[0].isIntersecting && endList.current && !loading) {
            console.log(page);
            console.log(loading);
            dispatch((dispatch, getState) => {
              const currentPage = getState().photosReducer.page;
              dispatch(photosRequestAsync({ token, page: currentPage + 1 }));
            });
        }
      }, {
        rootMargin: '100px',
      });
      observer.observe(endList.current);

      return () => {
        observer.disconnect();
      };
    }

  }, [endList.current, dispatch]);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {photos && photos?.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
      {photos && (
        <div ref={endList} className={s.end}></div>
      )}
    </Masonry>
  );
};
