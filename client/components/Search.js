import { useState, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import People from "./cards/People";

const Search = () => {
  const [state] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const searchUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`/search-user/${query}`);
      // console.log("search user =>", data);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form-inline row" onSubmit={searchUser}>
        <div className="col-8">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setResult([]);
            }}
            className="form-control"
            placeholder="Search"
          />
        </div>
        <div className="col-4">
          <button className="btn btn-outline-primary col-12" type="submit">
            Submit
          </button>
        </div>
      </form>
      {result && result.map((r) => <People key={r._id} people={result} />)}
    </>
  );
};

export default Search;
