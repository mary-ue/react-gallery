import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import s from './Root.module.css';
import { Container } from "../../Layout/Container/Container";

export const Root = () => {
  

  return(
    <>
      <Header />
      <main className={s.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};
