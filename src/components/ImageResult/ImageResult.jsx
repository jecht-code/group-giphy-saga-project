import { useSelector } from 'react-redux';

function ImageResult() {
    const giphy = useSelector((store) => store.giphy);

    const addFavoritesButton = (event) => {
        event.preventDefault();
        console.log(`Adding Item to Favorites`, {pizza})
    }

    return(
        <div>
            <h2>Image Results Top 10</h2>
            <ul>
                {giphy.map((giphyImage) => {
                    return(
                        <li key={giphyImage.id}>
                            <img src={giphyImage.image} alt={giphyImage.alt} />
                            <button onClick={addFavoritesButton}>Add to Favorites</button>
                        </li>
                        
                    );
                })}
            </ul>
        </div>
    )
}

export default ImageResult;