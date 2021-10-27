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

const PostPublic = ({
  post,
  handleComment,
  handleLike,
  handleUnlike,
  handleDelete,
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
              {handleLike !== undefined &&
                (state &&
                state.user &&
                post.likes &&
                post.likes.includes(state.user._id) ? (
                  <HeartFilled className="text-danger pt-2 h5" />
                ) : (
                  <HeartOutlined className="text-danger pt-2 h5" />
                ))}
              <div className="pt-2 px-1">{post.likes.length} likes</div>
              {handleComment !== undefined ? (
                <>
                  <CommentOutlined className="text-danger pt-2 h5 px-2" />
                  <div className="pt-2 px-1">
                    {post.comments.length} comments
                  </div>
                </>
              ) : (
                <div className="pt-2 px-1">{post.comments.length} comments</div>
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
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PostPublic;
