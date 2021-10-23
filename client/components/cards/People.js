import { useContext } from "react";
import { Avatar, List } from "antd";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const People = ({ people, handleFollow }) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) return user.image.url;
    return "/images/logo.png";
  };

  console.log(people);
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
                  {user.name}
                  <span
                    onClick={() => handleFollow(user)}
                    className="text-primary me-2 pointer"
                  >
                    Follow
                  </span>
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
