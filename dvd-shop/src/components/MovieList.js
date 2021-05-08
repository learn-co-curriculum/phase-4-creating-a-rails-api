import { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryFilter from "./CategoryFilter";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((r) => r.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  const categories = movies
    .map((movie) => movie.category)
    .filter(
      (category, index, categories) => categories.indexOf(category) === index
    )
    .sort();

  const displayedMovies = movies.filter(
    (movie) => selectedCategory === "All" || movie.category === selectedCategory
  );

  return (
    <Wrapper>
      <Sidebar>
        <CategoryFilter
          categories={["All", ...categories]}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Sidebar>
      <section>
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 16px;
  display: grid;
  gap: 16px;
  grid-template-columns: 200px 1fr;
`;

const Sidebar = styled.nav`
  position: sticky;
  top: 32px;
  height: 25vh;
`;

export default MovieList;
