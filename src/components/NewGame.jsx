const NewGame = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-row justify-center">
      <button
        className="rounded border-2 border-white border-solid p-2 my-2 bg-red-600 text-white text-2xl"
        onClick={() => location.reload()}
      >
        New Game
      </button>
    </div>
  );
};

export default NewGame;
