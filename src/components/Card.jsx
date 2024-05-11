import { useState } from "react";

const Card = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  function toggleFlip() {
    const next = !isFlipped;
    setIsFlipped(next);
  }

  const pokeball = "./src/assets/img/pokeball.png";

  const backTemplate = (
    <div className="card" onClick={toggleFlip}>
      <img className="card-back" src={pokeball}></img>
    </div>
  );

  const frontSideTemplate = (
    <div className="card" onClick={toggleFlip}>
      <img src={props.img} alt={props.name} />
      <p>{props.name}</p>
    </div>
  );

  return isFlipped ? frontSideTemplate : backTemplate;
};

export default Card;
