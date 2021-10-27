import { useContext } from "react";
import { UserContext } from "../../context";
import { Avatar, List } from "antd";
import Link from "next/link";
import { imageSource } from "../../functions";

const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);

  console.log("PEOPLE =>", JSON.stringify(people));
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  <Link href={`/user/${user.username}`}>
                    <a>{user.name}</a>
                  </Link>

                  {state &&
                  state.user &&
                  user.followers &&
                  user.followers.includes(state.user._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="text-primary me-2 pointer"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="text-primary me-2 pointer"
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
