import Head from "next/head";
import axios from "axios";
import ParallaxBG from "../../../components/cards/ParallaxBG";
import PostPublic from "../../../components/cards/PostPublic";

function SinglePost({ post }) {
  const head = () => (
    <Head>
      <title>MERNCAMP =&gt; A social network by devs for devs</title>
      <meta name="description" content={post.content} />
      <meta
        property="og:description"
        content="A social network by devs for devs"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MERNCAMP" />
      <meta
        property="og:url"
        content={`http://merncamp.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>
  );

  export const imageSource = (post) => {
    if (post.image) return post.image.url;
    return "/images/default.jpeg";
  };

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpeg" />
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic key={post._id} post={post} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  console.log(data);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
