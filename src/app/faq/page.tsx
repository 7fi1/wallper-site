import React from "react";
import { Main } from "./components/Main";
import { Wrapper } from "../layout/Wrapper/Wrapper";
import Header from "../layout/Header/Header";


const page = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  );
};

export default page;
