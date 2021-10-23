import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
// import { useRouter } from "next/router";
import { UserContext } from "../../../context";
import AuthForm from "../../../components/forms/AuthForm";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";

function ProfileUpdate() {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  // profile image
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (state && state.user) {
      // console.log("USER FROM STATE =>", state.user);
      setUsername(state.user.username);
      setAbout(state.user.about);
      setEmail(state.user.email);
      setName(state.user.name);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put("/profile-update", {
        username,
        about,
        name,
        email,
        password,
        secret,
        image,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // update localStorage, update user, keep toke
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        // update context
        setState({ ...state, user: data });

        setOk(true);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0]; // get the first file in the array.
    let formData = new FormData();
    formData.append("image", file);
    console.log(...formData);
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

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image text-light">
        <div className="col text-center">
          <h1>Profile</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <label className="d-flex justify-content-center h5">
            {image && image.url ? (
              <Avatar size={30} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" />
            )}
            <input
              onChange={handleImage}
              type="file"
              accept="images/*"
              hidden
            />
          </label>

          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
            profileUpdate={true}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="Congratulations:"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <>
              <p>You have successfully updated your profile!</p>
              <Link href="/login">
                <a className="btn btn-primary btn-sm">Login</a>
              </Link>
            </>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
