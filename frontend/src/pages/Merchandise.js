import useHttp from "../hooks/useHttp.js";
import Error from './Error.js';
import Cloths from "../Cloths.js";

const requestConfig = {};

export default function Merchandise(){
    const {
        data: loadedMeals,
        isLoading,
        error
    }  = useHttp('http://localhost:3000/meals',requestConfig,[]);

    if(isLoading){
        return <p className="text-center">Fetching meals Merchandise Page...</p>
    }

    if(error){
        return <Error  title="Failed to fetch meals Merchandise Page" message={error}/>
    }
   
    return (
        <ul id="meals" className="flex flex-wrap list-none p-20 m-10 gap-0 justify-between">
            {loadedMeals.map((meal ) => (
                <Cloths key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}