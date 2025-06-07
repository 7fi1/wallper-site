"use client";

import Footer from "../layout/Footer/Footer";
import Header from "../layout/Header/Header";
import { Wrapper } from "../layout/Wrapper/Wrapper";
import { Main } from "./components/Main";

const page = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer />
    </Wrapper>
  );
};

export default page;
