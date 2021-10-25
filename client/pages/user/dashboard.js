import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Pagination } from "antd";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import CommentForm from "../../components/forms/CommentForm";
import Search from "../../components/Search";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  // posts
  const [posts, setPosts] = useState([]);
  // people
  const [people, setPeople] = useState([]);
  // comments
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    fetchTotalPosts();
  }, []);

  const fetchTotalPosts = async () => {
    try {
      const { data } = await axios.get("/total-posts");
      setTotalPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
      findPeople();
    }
  }, [state && state.token, page]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      // console.log("user posts =>", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const findPeople = async () => {
    try {
      const { data } = await axios.get("find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("post =>", content);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/create-post`,
        { content, image }
      );
      // console.log("create post =>", data);

      if (data.error) {
        toast.error(data.error);
      } else {
        setPage(1);
        newsFeed();
        toast.success("Post created!");
        setContent("");
        setImage({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0]; // get the first file in the array.
    let formData = new FormData();
    formData.append("image", file);
    // console.log(...formData);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;

      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted!");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      // rerender posts in newsfeed
      newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put("/like-post", { _id });
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (post) => {
    // console.log(post);
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      // console.log(
      //   "POSTID =>",
      //   currentPost._id,
      //   "& COMMENT =>",
      //   comment,
      //   "& DATA =>",
      //   data
      // );
      setComment("");
      setVisible(false);
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    // console.log("PostID =>", postId, "& Comment =>", comment);

    let answer = window.confirm("Are you sure?");
    if (!answer) return;

    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      // console.log("COMMENT REMOVED =>", data);
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-default-image text-light">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-md-8">
          <PostForm
            content={content}
            setContent={setContent}
            postSubmit={postSubmit}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
          />
          <br />
          <PostList
            posts={posts}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
            removeComment={removeComment}
          />
          <Pagination
            current={page}
            total={(totalPosts / 3) * 10}
            onChange={(value) => setPage(value)}
            className="pb-5"
          />
        </div>
        <div className="col-md-4">
          <Search />
          <br />
          {state && state.user && state.user.following && (
            <Link href={`/user/following`}>
              <a className="h6">{state.user.following.length} Following</a>
            </Link>
          )}
          <People people={people} handleFollow={handleFollow} />
        </div>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={null}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRoute>
  );
};

export default Dashboard;
