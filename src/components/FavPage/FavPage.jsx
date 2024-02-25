import FavGif from '../FavGif/FavGif';
import { useDispatch, useSelector } from 'react-redux';

function FavPage(){

    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    return(
        <div>
            {favorites.map((gif) => {
                return(
                    <FavGif gif={gif} />
                )
            })}
        </div>
    )
};

export default FavPage;