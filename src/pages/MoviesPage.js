import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const API_KEY = "ec6f97a39ac170f97c30c083c2dada4c";

class MoviesPage extends Component {
  state = {
    input: "",
    movies: [],
  };

  componentDidMount() {
    const { search } = this.props.location;
    const searchString = new URLSearchParams(search).get("query");
    if (search.length !== 0) {
      this.setState({
        input: searchString,
      });
      this.axiosSaerchMovie();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      console.log(
        `Я ябновился prevProps-${prevProps.location.search}, this.props.location.search -${this.props.location.search}`
      );
      this.axiosSaerchMovie();
    }
  }

  axiosSaerchMovie = async () => {
    const { search } = this.props.location;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie${search}&api_key=${API_KEY}`
      );
      console.log(data);
      this.setState({
        movies: data.results,
      });
      console.log(this.state);
    } catch (error) {}
  };

  onHandleChange = (e) => {
    const { value } = e.target;
    this.setState({ input: value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push({ search: `query=${this.state.input}` });
  };

  render() {
    const { input } = this.state;
    console.log(this.state.movies);
    return (
      <>
        <h2>Это movie</h2>
        <form onSubmit={this.onHandleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.input}
              onChange={this.onHandleChange}
            />

            <button>search</button>
          </label>
        </form>
        <ul>
          {this.state.movies?.map((movie) => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: `/movies`, input },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
