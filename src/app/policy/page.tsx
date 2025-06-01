"use client";

import React from "react";
import { Wrapper } from "../layout/Wrapper/Wrapper";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { Main } from "./Main";

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
