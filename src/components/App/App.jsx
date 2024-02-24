import { useDispatch } from 'react-redux';

import SearchForm from "../SearchForm/SearchForm";
import ImageResult from '../ImageResult/ImageResult';

function App() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Giphy Search!</h1>

      <SearchForm />

      <ImageResult />

    </div>
  );
}

export default App;