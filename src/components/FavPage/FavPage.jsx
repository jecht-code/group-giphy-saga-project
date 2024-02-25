import FavGif from '../FavGif/FavGif';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function FavPage(){

    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_FAVORITES'})
    }, []);
    
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