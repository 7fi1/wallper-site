import React from "react";
import { Wrapper } from "../layout/Wrapper/Wrapper";
import Header from "../layout/Header/Header";
import { Main } from "../components/Admin/Main";

export default function Page() {
  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  );
}
