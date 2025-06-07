"use client";

import React from "react";
import { Wrapper } from "../layout/Wrapper/Wrapper";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { Pro } from "./Main";

const page = () => {
  return (
    <Wrapper>
      <Header />
      <Pro />
      <Footer />
    </Wrapper>
  );
};

export default page;
