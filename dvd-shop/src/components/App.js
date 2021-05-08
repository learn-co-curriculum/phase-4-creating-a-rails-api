import { Route, Switch } from "react-router";
import Header from "./Header";
import MovieForm from "./MovieForm";
import MovieList from "./MovieList";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <MovieList />
        </Route>
        <Route exact path="/new">
          <MovieForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
