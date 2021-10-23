import { useContext } from "react";
import renderHtml from "react-render-html";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "antd";
import {
  HeartOutlined,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";
import PostImage from "../images/PostImage";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { imageSource } from "../../functions";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
}) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post.id} className="card mb-5">
            <div className="card-header">
              <Avatar
                size={40}
                className="mb-2"
                src={imageSource(post.postedBy)}
              />

              <span className="pt-2 ml-3" style={{ marginLeft: ".5rem" }}>
                {post.postedBy.name}
              </span>
              <span className="pt-2 ml-3" style={{ marginLeft: ".5rem" }}>
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="card-body">{renderHtml(post.content)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              <div className="d-flex">
                {post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleUnlike(post._id)}
                    className="text-danger pt-2 h5"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleLike(post._id)}
                    className="text-danger pt-2 h5"
                  />
                )}
                <div className="pt-2 px-1">{post.likes.length} likes</div>
                <CommentOutlined
                  onClick={() => handleComment(post)}
                  className="text-danger pt-2 h5 px-2"
                />
                <div className="pt-2 px-1">2 comments</div>

                {state && state.user && state.user._id === post.postedBy._id && (
                  <>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      className="text-danger pt-2 h5 px-1 mx-auto"
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className="text-danger pt-2 h5 px-2"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
