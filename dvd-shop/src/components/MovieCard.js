import styled from "styled-components";

function MovieCard({ movie }) {
  return (
    <Wrapper>
      <Poster>
        <img src={movie.poster_url} alt={movie.title + " Poster"} />
      </Poster>
      {movie.discount && <Discount>Discount!</Discount>}
      <Detail>
        <h2>{movie.title}</h2>
        <p>
          {movie.category} | {movie.year} | {movie.length} min.
        </p>
        <p>Directed by {movie.director}</p>
        <p>{movie.description}</p>
      </Detail>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  flex-wrap: wrap;
`;

const Poster = styled.div`
  flex: 0 0 200px;

  img {
    width: 100%;
  }
`;

const Discount = styled.div`
  position: absolute;
  background-color: blue;
  color: yellow;
  font-weight: bold;
  top: 0;
  left: 0;
  padding: 8px 32px;
  text-align: center;
  transform: translateY(-100%) rotate(-90deg) translateX(-70.71067811865476%)
    rotate(45deg);
  transform-origin: bottom left;
`;

const Detail = styled.div`
  flex: 1 1 250px;

  h2 {
    margin-top: 0;
    margin-bottom: 12px;
  }

  p {
    margin: 8px 0;
    line-height: 1.4;
  }
`;

export default MovieCard;
