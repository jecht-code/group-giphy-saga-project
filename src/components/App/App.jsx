import { useDispatch } from 'react-redux';

import SearchForm from "../SearchForm/SearchForm";

function App() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Giphy Search!</h1>

      <SearchForm />

    </div>
  );
}

export default App;