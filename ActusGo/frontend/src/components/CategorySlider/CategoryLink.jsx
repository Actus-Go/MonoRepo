import { Link } from "react-router-dom";

export default function CategoryLink(name, URL, image) {
  return (
    <Link>
        <span>{name}</span>
        <span>{URL}</span>
        <span>{image}</span>
    </Link>
  )
}
