import { useState, useEffect } from "react";

import arrayShuffle from "array-shuffle";
import { nanoid } from "nanoid";

import ScoreBoard from "./components/ScoreBoard";
import Card from "./components/Card";
import TurnCounter from "./components/TurnCounter";
import NewGame from "./components/NewGame";

const URL = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
  const [cardInfoList, setCardInfoList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [turns, setTurns] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [playerOnePoints, setPlayerOnePoints] = useState(0);
  const [playerTwoPoints, setPlayerTwoPoints] = useState(0);

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
        if (currentPlayer === "Player 1") {
          setPlayerOnePoints((prev) => prev + 1);
        } else {
          setPlayerTwoPoints((prev) => prev + 1);
        }
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
        togglePlayer();
      } else {
        setTimeout(resetCardMatching, 2500);
        setTimeout(togglePlayer, 2500);
      }
    }
  }, [firstCard, secondCard]);

  function togglePlayer() {
    currentPlayer === "Player 1"
      ? setCurrentPlayer("Player 2")
      : setCurrentPlayer("Player 1");
  }

  function resetCardMatching() {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prev) => prev + 1);
  }

  function randomPokeNumber() {
    return Math.ceil(Math.random() * 151);
  }

  return (
    <div className="w-screen h-screen bg-lime-500">
      <h1 className="text-white bg-red-600 text-center text-4xl font-bold p-2">
        Pokemon Memory
      </h1>
      <ScoreBoard
        currentPlayer={currentPlayer}
        playerOnePoints={playerOnePoints}
        playerTwoPoints={playerTwoPoints}
      />
      <div className="rounded border-2 border-white border-solid p-2 w-11/12 mx-auto my-2 flex flex-row flex-wrap bg-lime-600 shadow-md">
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
      <TurnCounter turns={turns} />
      <NewGame />
    </div>
  );
};

export default App;
