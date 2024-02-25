import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function ImageResult() {
    const giphy = useSelector((store) => store.giphy);
    const dispatch = useDispatch();


    const addFavoritesButton = (image) => {
        console.log(image);
        dispatch({ type: 'POST_FAVORITES', payload: image});
    }

    return(
        <div>
            <h2>Image Results Top 10</h2>
            <ul>
                {giphy.map((giphyImage) => {
                    return(
                        <li key={giphyImage.id}>
                            <img src={giphyImage.image} alt={giphyImage.alt} />
                            <button onClick={(event) => addFavoritesButton(giphyImage.image)}>Add to Favorites</button>
                        </li>
                        
                    );
                })}
            </ul>
        </div>
    )
}

export default ImageResult;