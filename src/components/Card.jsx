import pokeball from "/src/assets/pokeball_small.jpeg";

const Card = ({ card, isFlipped, handleChoice }) => {
  function handleClick() {
    handleChoice(card);
  }

  const backTemplate = (
    <div className="rounded border-2 border-solid border-slate-600 w-1/3 lg:max-w-48">
      <img className="mx-auto" src={pokeball} onClick={handleClick}></img>
    </div>
  );

  const frontSideTemplate = (
    <div className="rounded border-2 border-solid border-slate-600 flex flex-col justify-center items-center w-1/3 lg:max-w-48 bg-white p-1">
      <img className="mx-auto" src={card.img} alt={card.name} />
    </div>
  );

  return isFlipped ? frontSideTemplate : backTemplate;
};

export default Card;
