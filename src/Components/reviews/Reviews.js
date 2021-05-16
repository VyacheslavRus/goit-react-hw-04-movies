import axios from "axios";
import React, { Component } from "react";

const API_KEY = "ec6f97a39ac170f97c30c083c2dada4c";

class Reviews extends Component {
  state = { reviews: null };

  async componentDidMount() {
    const id = this.props.match.params.movieId;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
      );
      this.setState({
        reviews: data.results,
      });
    } catch (error) {}
  }

  render() {
    const { reviews } = this.state;
    console.log(reviews);
    return reviews && reviews.length !== 0 ? (
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p> {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <strong>We don`t have eny reviws for this move</strong>
    );
  }
}

export default Reviews;
