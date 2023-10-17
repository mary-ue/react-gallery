import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
// import { Main } from "../Main/Main";
import { Container } from "../../Layout/Container/Container";

export const Root = () => {
  

  return(
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};
