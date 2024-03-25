import { useState, useEffect } from "react";
import { COCKTAIL_ENDPOINT_SEARCH_BY_LETTER } from "../../services/cocktails/COCKTAILS_API";

export function useCocktailsByLetter (initialLetter){
  
  const [letter, setLetter] = useState(initialLetter);

  const COCKTAIL_ENDPOINT_SEARCH_BY_LETTER = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f="

  const [cocktails, setCocktails] = useState(null)

  useEffect(() => {
    fetch(COCKTAIL_ENDPOINT_SEARCH_BY_LETTER + letter)
      .then(res => res.json())
      .then(json => {
        setCocktails(json.drinks);
        
        console.log("peticion correcta")
        console.log(letter)
      })
      .catch(error => {
        console.log("Error en la petición: ", error);
      });
  }, [letter]);

  const changeLetter = (newLetter) => {
    setLetter(newLetter)
  }

  const listOfCocktails = cocktails
    ? cocktails.map(cocktail => ({
      id: cocktail.idDrink,
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb
    }))
    : []

    return [listOfCocktails, changeLetter]
}