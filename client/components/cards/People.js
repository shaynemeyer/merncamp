import { Avatar, List } from "antd";
import { imageSource } from "../../functions";

const People = ({ people, handleFollow }) => {
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
