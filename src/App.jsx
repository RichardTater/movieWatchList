import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import MovieScreen from "./components/MovieScreen";
import axios from "axios";
import Watchlist from "./components/Watchlist";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [page, setPage] = useState(1);

  const getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieList(res.data.results);
      })
      .catch((theseHands) => console.log(theseHands));
  };

  useEffect(() => {
    getData();
  }, [page]);

  const addMovie = (movie) => {
    setWatchList([...watchList, movie]);
  }

  const removeMovie = (movie) => {
    let newState = watchList.filter((mov) => {
      return mov !== movie
    })
    setWatchList(newState);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <MovieScreen
          addMovie={addMovie}
          watchList={watchList}
          page={page}
          setPage={setPage}
          movieList={movieList}
          removeMovie={removeMovie}
        />
        <Watchlist 
          watchList={watchList}
          removeMovie={removeMovie}
        />
      </main>
    </div>
  );
}

export default App;
