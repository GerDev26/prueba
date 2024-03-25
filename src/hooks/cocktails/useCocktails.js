import { useState, useEffect } from "react";
import { COCKTAIL_ENDPOINT_SEARCH_BY_LETTER } from "../../services/cocktails/COCKTAILS_API";

export function useCocktailsMap(initialRequest = null){
  const [request, setRequest] = useState(initialRequest)

  const [mappedRequest, setMappedRequest] = useState(null);

  const mapCocktails = (data) => {
    return data.map(cocktail => ({
      id: cocktail.idDrink,
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb
    }));
  }

  useEffect(() => {
    if (request) {
      const mappedCocktails = mapCocktails(request);
      setMappedRequest(mappedCocktails);
    }
  }, [request]);

  const changeRequest = (request) => {
    setRequest(request)
  }

  return [mappedRequest, changeRequest]
}

export function useCocktailsByLetter (initialLetter){

  const [letter, setLetter] = useState(initialLetter);

  const [request, setRequest] = useCocktailsMap(null);

  useEffect(() => {
    fetch(COCKTAIL_ENDPOINT_SEARCH_BY_LETTER + letter)
      .then(res => res.json())
      .then(json => {
        setRequest(json.drinks);
        
        console.log("Petición correcta");
        console.log(letter);
      })
      .catch(error => {
        console.log("Error en la petición: ", error);
      });
  }, [letter]);

  const changeLetter = (newLetter) => {
    setLetter(newLetter)
  }

  return [request, changeLetter]
}
