import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import AuthForm from "../components/forms/AuthForm";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
        secret,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setOk(data.ok);
        setName("");
        setEmail("");
        setPassword("");
        setSecret("");
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push("/");

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image text-light">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
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
              <p>You have successfully registered!</p>
              <Link href="/login">
                <a className="btn btn-primary btn-sm">Login</a>
              </Link>
            </>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="text-center">
            Already registered?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
