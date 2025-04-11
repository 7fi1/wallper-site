import { Main } from "./components/HomePage/Main";
import Header from "./layout/Header/Header";
import { Wrapper } from "./layout/Wrapper/Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  );
}
