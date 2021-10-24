import Post from "./Post";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
}) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            handleComment={handleComment}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />
        ))}
    </>
  );
};

export default PostList;
