import { useState, useEffect } from "react";
import { COCKTAIL_ENDPOINT_SEARCH_BY_LETTER, COCKTAIL_ENDPOINT_RANDOM_COCKTAIL } from "../../services/cocktails/COCKTAILS_API";

function useCocktailsMap(initialRequest = null){
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
      .then(data => {
        setRequest(data.drinks);
        
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

export function useRandomCocktail(){
  const [request, setRequest] = useCocktailsMap()

  useEffect(() => {
    fetch(COCKTAIL_ENDPOINT_RANDOM_COCKTAIL)
      .then(res => res.json())
      .then(data => {
        setRequest(data.drinks)
      })
      .catch(error => {
        console.log("Error en la peticion: ", error)
      })
  }, [])
  return request
}
