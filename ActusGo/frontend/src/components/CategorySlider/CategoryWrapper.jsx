import CategoryLink from "./CategoryLink";

export default function CategoryWrapper({ categories }) {
  return (
    <div>
      <h2>CategoryWrapper</h2>

      <div>
        {categories.map((category) => (
          <CategoryLink />
        ))}
      </div>
    </div>
  )
}
