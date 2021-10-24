import renderHtml from "react-render-html";
import { imageSource } from "../../functions";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Avatar } from "antd";
import {
  HeartOutlined,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";
import PostImage from "../images/PostImage";

import { useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";

const Post = ({
  post,
  handleComment,
  handleLike,
  handleUnlike,
  commentsCount = 2,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {post && post.postedBy && (
        <div className="card mb-5">
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
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
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
              <div className="pt-2 px-1">
                <Link href={`/post/${post._id}`}>
                  <a>{post.comments.length} comments</a>
                </Link>
              </div>

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
          {/* 2 comments here */}
          <ul
            className="list-group"
            style={{ maxHeight: "125px", overflow: "scroll" }}
          >
            {post.comments.slice(0, commentsCount).map((c) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-start"
                key={c._id}
              >
                <div className="ms-2 me-auto">
                  <div>
                    <Avatar
                      size={20}
                      className="mb-1 mr-3"
                      src={imageSource(c.postedBy)}
                    />{" "}
                    {c.postedBy.name}
                  </div>
                  <div>{c.text}</div>
                </div>
                <span className="badge rounded-pill text-muted">
                  {formatDistanceToNow(new Date(c.created), {
                    addSuffix: true,
                  })}
                  {state && state.user && state.user._id === c.postedBy._id && (
                    <div className="ml-auto mt-1">
                      <DeleteOutlined
                        onClick={() => removeComment(post._id, c)}
                        className="pl-2 text-danger"
                      />
                    </div>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Post;
