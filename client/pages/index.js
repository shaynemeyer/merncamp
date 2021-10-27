import { useContext } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import Post from "../components/cards/Post";

function HomePage({ posts }) {
  const [state, setState] = useContext(UserContext);

  return (
    <>
      <ParallaxBG url="/images/default.jpeg" />
      <div className="container">
        <div className="row pt-5">
          {posts &&
            posts.map((post) => (
              <div className="col-md-4">
                <Post key={post._id} post={post} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}

export default HomePage;
