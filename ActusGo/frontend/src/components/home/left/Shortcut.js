export default function Shortcut({ link, img, name }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="shortcut_item">
      <img src={img} alt="" />
      <span>{name}</span>
    </a>
  );
}
