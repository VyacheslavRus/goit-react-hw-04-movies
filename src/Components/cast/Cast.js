import axios from "axios";
import React, { Component } from "react";
import { CastStyled } from "./CastStyled";

const API_KEY = "ec6f97a39ac170f97c30c083c2dada4c";

class Cast extends Component {
  state = { casts: null };

  async componentDidMount() {
    const id = this.props.match.params.movieId;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      console.log(data);
      this.setState({
        casts: data.cast,
      });
      console.log(this.state);
    } catch (error) {}
  }

  render() {
    const { casts } = this.state;
    return (
      this.state.casts && (
        <>
          <CastStyled>
            {casts.map(
              (cast) =>
                cast.profile_path && (
                  <li className="castItem" key={cast.cast_id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt={cast.original_name}
                    />
                    <h2>{cast.name}</h2>
                    <p>Character: {cast.character}</p>
                  </li>
                )
            )}
          </CastStyled>
        </>
      )
    );
  }
}

export default Cast;
