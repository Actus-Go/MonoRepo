const ButtonOptions = () => {
  return (
    <>
      <button className="px-3 py-2 bg-indigo-600 hover:bg-indigo-800 transition-colors text-white text-xs rounded-lg w-1/2">
        Accept
      </button>
      <button className="px-3 py-2 border border-purple-300 hover:bg-indigo-600 transition-colors duration-75 text-white text-xs rounded-lg w-1/2">
        Decline
      </button>{" "}
    </>
  );
};
export default ButtonOptions;
