import { useState } from "react";
import pokeball from "/src/assets/pokeball_small.jpeg";

const Card = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  // const pokeball = "./src/assets/pokeball_small.jpeg";

  function toggleFlip() {
    const next = !isFlipped;
    setIsFlipped(next);
  }

  const backTemplate = (
    <div
      className="rounded border-2 border-solid border-slate-600 w-1/3"
      onClick={toggleFlip}
    >
      <img src={pokeball}></img>
    </div>
  );

  const frontSideTemplate = (
    <div
      className="rounded border-2 border-solid border-slate-600 flex flex-col justify-center items-center w-1/3 bg-white p-1"
      onClick={toggleFlip}
    >
      <img src={props.img} alt={props.name} />
    </div>
  );

  return isFlipped ? frontSideTemplate : backTemplate;
};

export default Card;
