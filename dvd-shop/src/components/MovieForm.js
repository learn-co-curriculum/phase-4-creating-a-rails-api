import { useState } from "react";
import styled from "styled-components";

function MovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    length: "0",
    director: "",
    description: "",
    poster_url: "",
    category: "",
    discount: false,
    female_director: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    });
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            min="1888"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="length">Length</label>
          <input
            type="number"
            id="length"
            value={formData.length}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            value={formData.director}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="poster_url">Poster</label>
          <input
            type="text"
            id="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="discount">
            Discount?
            <input
              type="checkbox"
              id="discount"
              checked={formData.discount}
              onChange={handleChange}
            />
          </label>
        </FormGroup>
        <FormGroup>
          <label htmlFor="female_director">
            Female Director?
            <input
              type="checkbox"
              id="female_director"
              checked={formData.female_director}
              onChange={handleChange}
            />
          </label>
        </FormGroup>
        <SubmitButton type="submit">Add Movie</SubmitButton>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 32px auto;
  padding: 32px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  background: blue;
  color: yellow;
  font-weight: bold;
  font-family: inherit;
  font-size: 1.2rem;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

export default MovieForm;
