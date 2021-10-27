import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import Head from "next/head";
import axios from "axios";
import ParallaxBG from "../components/cards/ParallaxBG";
import PostPublic from "../components/cards/PostPublic";
import Link from "next/link";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

function HomePage({ posts }) {
  const [state, setState] = useContext(UserContext);
  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed(newPost, ...posts);
    });
  }, []);

  const head = () => (
    <Head>
      <title>MERNCAMP =&gt; A social network by devs for devs</title>
      <meta name="description" content="A social network by devs for devs" />
      <meta
        property="og:description"
        content="A social network by devs for devs"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MERNCAMP" />
      <meta property="og:url" content="http://merncamp.com" />
      <meta
        property="og:image:secure_url"
        content="http://merncamp.com/images/default.jpeg"
      />
    </Head>
  );

  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpeg" />
      <div className="container">
        <div className="row pt-5">
          {collection &&
            collection.map((post) => (
              <div key={post._id} className="col-md-4">
                <Link href={`/post/view/${post._id}`}>
                  <a>
                    <PostPublic key={post._id} post={post} />
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");

  return {
    props: {
      posts: data,
    },
  };
}

export default HomePage;
