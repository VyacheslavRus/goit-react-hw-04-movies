import axios from "axios";
import React, { Component, lazy, Suspense } from "react";
import { Link, Route, Switch } from "react-router-dom";
// import Cast from "../Components/cast/Cast";
// import Reviews from "../Components/reviews/Reviews";
import { MovieDetailsPageStyled } from "./StyledPages/MovieDetailsPageStyled";

const Cast = lazy(() =>
  import("../Components/cast/Cast.js" /* webpackChunkName: "cast-page" */)
);

const Reviews = lazy(() =>
  import(
    "../Components/reviews/Reviews.js" /* webpackChunkName: "reviews-page" */
  )
);

const API_KEY = "ec6f97a39ac170f97c30c083c2dada4c";

class MovieDetailsPage extends Component {
  state = {
    movie: null,
    from: "",
  };

  async componentDidMount() {
    const id = this.props.match.params.movieId;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      this.setState({
        movie: data,
        from: this.props.location.state?.from,
        input: this.props.location.state?.input,
      });
      console.log(this.state);
    } catch (error) {}
  }

  onHandleClick = () => {
    const { history } = this.props;
    const { input, from } = this.state;
    if (this.state?.input) {
      history.push({ pathname: from, search: `query=${input}` });
    } else history.push({ pathname: from });
  };

  render() {
    console.log(this.props.match.params.movieId);
    const { movie } = this.state;
    return (
      this.state.movie && (
        <MovieDetailsPageStyled>
          <button
            className="buttonBack"
            type="button"
            onClick={this.onHandleClick}
          >
            Go back
          </button>
          <div className="contextMovie">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt="photoSlava"
            />
            <div>
              <h1>
                {movie.original_title} {movie.release_date}
              </h1>
              <p>User score: {Math.floor(movie.popularity)}%</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <p>Genres</p>
              <ul className="genreList">
                {movie.genres.map((genre) => (
                  <li className="genreItem" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="detailsLinksList">
            <li className="detailsLinksItem">
              <Link
                to={{
                  pathname: `${this.props.match.url}/cast`,
                  state: { from: this.props.match.url },
                }}
              >
                Cast
              </Link>
            </li>
            <li className="detailsLinksItem">
              <Link
                to={{
                  pathname: `${this.props.match.url}/reviews`,
                  state: { from: this.props.match.url },
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Switch>
              <Route path={`${this.props.match.path}/cast`} component={Cast} />
              <Route
                path={`${this.props.match.path}/reviews`}
                component={Reviews}
              />
            </Switch>
          </Suspense>
        </MovieDetailsPageStyled>
      )
    );
  }
}

export default MovieDetailsPage;
