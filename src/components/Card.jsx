import pokeball from "/src/assets/pokeball_small.jpeg";

const Card = (props) => {
  function handleClick() {
    props.handleChoice(props.card);
  }

  const backTemplate = (
    <div className="rounded border-2 border-solid border-slate-600 w-1/3">
      <img src={pokeball} onClick={handleClick}></img>
    </div>
  );

  const frontSideTemplate = (
    <div className="rounded border-2 border-solid border-slate-600 flex flex-col justify-center items-center w-1/3 bg-white p-1">
      <img src={props.img} alt={props.name} />
    </div>
  );

  return props.isFlipped ? frontSideTemplate : backTemplate;
};

export default Card;
