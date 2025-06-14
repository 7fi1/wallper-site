import React from "react";
import { Wrapper } from "../layout/Wrapper/Wrapper";
import { Main } from "./Admin/Main";
import AdminHeader from "../layout/AdminHeader/AdminHeader";

export default function Page() {
  return (
    <Wrapper>
      <AdminHeader />
      <Main />
    </Wrapper>
  );
}
