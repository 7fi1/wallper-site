import React from "react";
import { Wrapper } from "../../layout/Wrapper/Wrapper";
import { Admin } from "../Admin/Main";
import Main from "./Main";
import AdminHeader from "../../layout/AdminHeader/AdminHeader";

const Moderate = () => {
  return (
    <Wrapper>
      <AdminHeader />
      <Admin>
        <Main />
      </Admin>
    </Wrapper>
  );
};

export default Moderate;
