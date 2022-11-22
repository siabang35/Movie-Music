import axios from "axios";
import { useEffect, useState } from "react";
import SingleData from "../../components/SingleData/SingleData";
import "./TrendingHome.css";
import "./../PagesStyles.css";
import Pagination from "../../components/Pagination/Pagination";
import Myloader from "react-spinners/PuffLoader";

const Trending = () => {
  const [trendingContent, setTrendingContent] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  let [color, setColor] = useState("grey");

  const fetchTrendingApi = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setTrendingContent(data.results);
    setIsLoading(true);
    // eslint-disable-next-line
  };

  useEffect(() => {
    fetchTrendingApi();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <main className="all__treads">
        <div className="my__main2  pt-5">
          <div
            style={{ marginTop: "0px", color: "white" }}
            className="TrendingHome"
          >
            <h3> Trending Shows:</h3>
          </div>
          <Pagination
            setPage={setPage}
            page={page}
            media="trending"
            numOfPages="3"
          />
        </div>

        <div className="ListContent2">
          {isLoading && trendingContent ? (
            trendingContent.map((n) => <SingleData key={n.id} {...n} />)
          ) : (
            <div
              className="loading  "
              style={{
                display: "flex",
                height: "450px",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Myloader color={color} size={60} />
              <p
                style={{
                  color: "grey",
                  fontSize: "13px",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                fetching data ...
              </p>
            </div>
          )}
        </div>
        <Pagination
          setPage={setPage}
          page={page}
          media="trending"
          numOfPages="3"
        />
      </main>
    </>
  );
};

export default Trending;
