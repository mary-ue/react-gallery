import { useParams } from "react-router-dom";

export const PhotoPage = () => {
  const { id } = useParams();

  return(
    <>
      {id}
    </>
  );
};
