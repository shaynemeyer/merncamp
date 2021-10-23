import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
  profileUpdate,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {profileUpdate && (
        <>
          <div className="form-group p-2">
            <small>
              <label htmlFor="name" className="text-muted">
                Username
              </label>
            </small>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group p-2">
            <small>
              <label htmlFor="name" className="text-muted">
                About
              </label>
            </small>
            <input
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              name="about"
              type="text"
              className="form-control"
              placeholder="Enter about"
            />
          </div>
        </>
      )}

      {page !== "login" && (
        <div className="form-group p-2">
          <small>
            <label htmlFor="name" className="text-muted">
              Your name
            </label>
          </small>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
      )}
      <div className="form-group p-2">
        <small>
          <label htmlFor="email" className="text-muted">
            Email address
          </label>
        </small>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter email address"
          disabled={profileUpdate}
        />
      </div>
      <div className="form-group p-2">
        <small>
          <label htmlFor="password" className="text-muted">
            Password
          </label>
        </small>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>
      {page !== "login" && (
        <>
          <div className="form-group p-2">
            <small>
              <label htmlFor="question" className="text-muted">
                Pick a question
              </label>
            </small>
            <br />
            <select name="question">
              <option>What is your favorite color?</option>
              <option>What is your best friend's name?</option>
              <option>What city were you born in?</option>
            </select>
            <br />
            <small className="text-muted">
              You can use this to reset your password if forgotten.
            </small>
          </div>
          <div className="form-group p-2">
            <input
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Write your answer here"
            />
          </div>
        </>
      )}
      <div className="form-group p-2">
        <button
          disabled={
            profileUpdate
              ? loading
              : page === "login"
              ? !email || !password || loading
              : !name || !email || !password || !secret || loading
          }
          className="btn btn-primary col-12"
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
