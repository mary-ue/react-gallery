import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../Layout/Container/Container";
import s from './Header.module.css';
import { ReactComponent as ArrowBack } from './img/back.svg';
import { Auth } from "./Auth/Auth";

export const Header = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerWrapper}>
          <button className={s.button} onClick={goBack}>
            <ArrowBack className={s.svg} width={40} height={40} />
          </button>
          <Link className={s.name} to="/">React Study Project</Link>
          <Auth />
        </div>
      </Container>
    </header>
  );
};
