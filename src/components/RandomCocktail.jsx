import { CocktailCard } from "./CocktailCard/CocktailCard"
import { useRandomCocktail } from "../hooks/cocktails/useCocktails"

export function RandomCocktail() {
    const cocktail = useRandomCocktail()
    
    return (
        <div> {console.log("render")}
            {cocktail ? (
                <CocktailCard key={cocktail[0].id} id={cocktail[0].id} name={cocktail[0].name} image={cocktail[0].image}/>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
}
