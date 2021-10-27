import { useContext } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";

function HomePage() {
  const [state, setState] = useContext(UserContext);

  return (
    <>
      <ParallaxBG url="/images/default.jpeg" />
    </>
  );
}

export default HomePage;
