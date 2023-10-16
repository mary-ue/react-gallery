import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";

export const Root = () => {
  

  return(
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};
