import { useState, useEffect } from "react";
import Card from "./components/Card";
import arrayShuffle from "array-shuffle";
import { nanoid } from "nanoid";

const URL = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
  const [cardInfoList, setCardInfoList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [turns, setTurns] = useState(1);

  // Get data from Pokemon API
  useEffect(() => {
    async function fetchData() {
      let id = randomPokeNumber();
      const response = await fetch(URL + id, { mode: "cors" });
      const data = await response.json();
      const newCardInfo = {
        id: nanoid(),
        name: data.species.name,
        img: data.sprites.front_default,
        matched: false,
      };
      if (!cardInfoList.includes(data)) {
        setCardInfoList([
          ...cardInfoList,
          newCardInfo,
          { ...newCardInfo, id: nanoid() },
        ]);
      }
    }

    cardInfoList.length < 12 && fetchData();
    setFinalList(arrayShuffle(cardInfoList));
  }, [cardInfoList]);

  // Set clicked card and check if cards match
  function handleChoice(clickedCard) {
    firstCard ? setSecondCard(clickedCard) : setFirstCard(clickedCard);
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.name === secondCard.name) {
        console.log("It's a match.");
        setFinalList((prevCards) => {
          return prevCards.map((card) => {
            if (card.name === firstCard.name) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCardMatching();
      } else {
        console.log(`${firstCard.name} and ${secondCard.name} don't match.`);
        setTimeout(resetCardMatching, 2500);
      }
    }
  }, [firstCard, secondCard]);

  function resetCardMatching() {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prev) => prev + 1);
  }

  function randomPokeNumber() {
    return Math.ceil(Math.random() * 151);
  }

  // For debugging
  // if (finalList.length === 12) {
  //   for (let obj of finalList) {
  //     console.log(
  //       `Pokemon: ${obj.name}
  //       Matched: ${obj.matched}
  //       ID: ${obj.id}`
  //     );
  //   }
  // }

  return (
    <div className="w-screen h-screen bg-lime-600">
      <h1 className="text-white bg-red-600 text-center text-4xl font-bold p-2">
        Pokemon Memory
      </h1>
      <div className="rounded border-2 border-white border-solid p-2 w-11/12 mx-auto my-2 flex flex-row flex-wrap">
        {finalList.map((card) => {
          return (
            <Card
              card={card}
              key={card.id}
              img={card.img}
              name={card.name}
              matched={card.matched}
              handleChoice={handleChoice}
              isFlipped={
                card.id === firstCard?.id ||
                card.id === secondCard?.id ||
                card.matched
              }
            />
          );
        })}
      </div>
      <div className="rounded border-2 border-white border-solid p-2 w-11/12 mx-auto my-2">
        <p className="text-white text-center text-3xl">Turn {turns}</p>
      </div>
    </div>
  );
};

export default App;
