import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
  handleSubmit,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
  page,
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
        />
      </div>
      <div className="form-group p-2">
        <small>
          <label htmlFor="password" className="text-muted">
            Password
          </label>
        </small>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter new password"
        />
      </div>

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

      <div className="form-group p-2">
        <button
          disabled={!email || !newPassword || !secret || loading}
          className="btn btn-primary col-12"
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
