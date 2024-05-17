const TurnCounter = ({ turns }) => {
  return (
    <div className="rounded border-2 border-white border-solid p-2 w-11/12 mx-auto my-2 bg-lime-600 shadow-md">
      <p className="text-white text-center text-3xl">Turn {turns}</p>
    </div>
  );
};

export default TurnCounter;
