import { useSelector } from 'react-redux';

function ImageResult() {
    const giphy = useSelector((store) => store.giphy);

    return(
        <div>
            <h2>Image Results Top 10</h2>
            <ul>
                {giphy.map((giphyImage) => {
                    return(
                        <li key={giphyImage.id}>
                            <img src={giphyImage.image} alt={giphyImage.alt} />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default ImageResult;