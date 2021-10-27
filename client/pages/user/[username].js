import { useContext, useState, useEffect } from "react";
import { Avatar, Card } from "antd";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Meta } = Card;

const Username = () => {
  const [state, setState] = useContext(UserContext);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) fetchUser();
  }, [router.query.username]);

  const imageSource = (user) => {
    if (user.image) return user.image.url;
    return "/images/logo.png";
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row py-5 bg-default-image text-light">
          <div className="col text-center">
            <h1>{user && user.name}</h1>
            {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
          </div>
        </div>
      </div>
      <div className="row col-md-6 offset-md-3 pt-5 pb-5">
        <Card hoverable cover={<img src={imageSource(user)} alt={user.name} />}>
          <Meta title={user.name} description={user.about} />
          <p className="pt-2 text-muted">
            Joined {formatDistanceToNow(new Date(user.createdAt))}
          </p>

          <div className="d-flex justify-content-between">
            <span className="btn btn-sm">
              {user.followers && user.followers.length} Followers
            </span>
            <span className="btn btn-sm">
              {user.following && user.following.length} Following
            </span>
          </div>
        </Card>
        <Link href="/user/dashboard">
          <a className="d-flex justify-content-center pt-5">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
    </>
  );
};

export default Username;
