import { useState, useEffect } from "react";
import Card from "./components/Card";
import arrayShuffle from "array-shuffle";

const URL = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
  const [cardList, setCardList] = useState([]);

  async function fetchData() {
    let id = randomPokeNumber();
    const response = await fetch(URL + id, { mode: "cors" });
    const data = await response.json();
    const newCard = (
      <Card name={data.species.name} img={data.sprites.front_default} />
    );
    setCardList([...cardList, newCard, newCard]);
  }

  useEffect(() => {
    cardList.length < 12 && fetchData();
  }, [cardList]);

  function randomPokeNumber() {
    return Math.ceil(Math.random() * 151);
  }

  return (
    <div className="w-screen h-screen bg-lime-600">
      <h1 className="text-white bg-red-600 text-center text-4xl font-bold p-2">
        Pokemon Memory
      </h1>
      <div className="rounded border-2 border-white border-solid p-2 w-11/12 mx-auto my-2 flex flex-row flex-wrap">
        {arrayShuffle(cardList)}
      </div>
    </div>
  );
};

export default App;
