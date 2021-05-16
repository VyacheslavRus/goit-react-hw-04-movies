import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./Components/navBar/NavBar";
// import HomePage from "./pages/HomePage";
// import MoviesPage from "./pages/MoviesPage";
import NotFound from "./pages/NotFound";
// import MovieDetailsPage from "./pages/MovieDetailsPage";

const HomePage = lazy(() =>
  import("./pages/HomePage.js" /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import("./pages/MoviesPage.js" /* webpackChunkName: "movies-page" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./pages/MovieDetailsPage.js" /* webpackChunkName: "movieDetails-page" */
  )
);

const App = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies" exact component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
