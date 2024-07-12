export default function Story({ story }) {
  return (
    <div className="story">
      <img src={story.image} alt="" className="story_img" />
      <div className="story_profile_pic">
        <img src={story.profile_picture} alt="" />
      </div>
      <div className="story_profile_name">{story.profile_name}</div>
    </div>
  );
}
