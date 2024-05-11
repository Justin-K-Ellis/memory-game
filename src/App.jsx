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
    <div className="outer-container">
      <h1>Pokemon Time</h1>
      <div className="container">{arrayShuffle(cardList)}</div>
    </div>
  );
};

export default App;
