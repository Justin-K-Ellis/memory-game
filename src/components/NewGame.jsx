const NewGame = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-row justify-center">
      <button
        className="rounded border-2 border-white border-solid p-2 my-2 bg-gradient-to-r from-red-500 to-red-600 text-center text-white text-2xl shadow-md"
        onClick={() => location.reload()}
      >
        New Game
      </button>
    </div>
  );
};

export default NewGame;
