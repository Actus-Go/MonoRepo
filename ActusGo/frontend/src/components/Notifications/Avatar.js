const Avatar = ({ name, imageUrl, isActive }) => {
  return (
    <div className="w-8 aspect-square rounded-full relative">
      {/* Avatar Image Wrapper */}
      <div className="w-full h-full rounded-full overflow-hidden">
        <img
          src={imageUrl}
          className="min-w-full min-h-full object-cover"
          alt={name || "User Avatar"}
        />
      </div>

      {/* Active Status Indicator */}
      {isActive && (
        <span className="bg-green-500 w-2 aspect-square rounded-full absolute right-0 bottom-0" />
      )}
    </div>
  );
};

export default Avatar;
