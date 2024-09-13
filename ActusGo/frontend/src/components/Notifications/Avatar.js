const Avatar = () => {
  return (
    <div className="w-8 h-8">
      <img
        src={require("./userprofile.jpg")}
        className="w-full h-full rounded-full"
        alt=""
      />
    </div>
  );
};
export default Avatar;
