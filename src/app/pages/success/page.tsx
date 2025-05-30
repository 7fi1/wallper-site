"use client";

import Header from "../../layout/Header/Header";
import { Wrapper } from "../../layout/Wrapper/Wrapper";
import { Main } from "./components/Main";

const page = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  );
};

export default page;
