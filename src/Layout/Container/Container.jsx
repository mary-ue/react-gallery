import s from './Container.module.css';

export const Container = ({ children }) => {
  return (
    <div className={s.Container}>{ children }</div>
  )
};