const ScoreBoard = (props) => {
  return (
    <div className="rounded border-2 border-white border-solid p-2 w-11/12 lg:w-8/12 mx-auto my-2 flex flex-col text-white justify-center items-center bg-lime-600">
      <p className="text-3xl">{props.currentPlayer}'s Turn</p>
      <div className="flex flex-row justify-between gap-8 text-2xl">
        <p>Player 1: {props.playerOnePoints}</p>
        <p>Player 2: {props.playerTwoPoints}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
