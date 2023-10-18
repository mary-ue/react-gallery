import RotateLoader from 'react-spinners/RotateLoader';

export const Loader = ({ size }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}
    >
      <RotateLoader color='black' size={size} />
    </div>
  );
};
