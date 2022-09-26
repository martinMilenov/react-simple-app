import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const fetchData = async () => {
    const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: debouncedInput,
      },
    });

    setResults(data.query.search);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [input]);

  useEffect(() => {
    if (debouncedInput) {
      fetchData();
    }
  }, [debouncedInput]);

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter search term</label>
          <input
            value={input}
            onChange={handleChange}
            className="input"
            type="text"
          />
        </div>
      </div>
      <div className="ui celled list">
        {results.map((result) => (
          <div key={result.pageid} className="item">
            <div className="right floated content">
              <a
                rel="noreferrer"
                target="_blank"
                className="ui button"
                href={`https://en.wikipedia.org?curid=${result.pageid}`}
              >
                Go
              </a>
            </div>
            <div className="content">
              <div className="header">{result.title}</div>
              <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
