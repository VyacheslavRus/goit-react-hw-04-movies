import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const API_KEY = "ec6f97a39ac170f97c30c083c2dada4c";

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      );
      console.log(data);
      this.setState({
        movies: data.results,
      });
      console.log(this.state);
    } catch (error) {}
  }

  render() {
    return (
      this.state.movies && (
        <>
          <h2>Trending today</h2>
          <ul>
            {this.state.movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: `/` },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )
    );
  }
}

export default HomePage;
