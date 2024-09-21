import ProductCard from "./ProductCard";

export default function ProductsWrapper({ products }) {
    return (
        <div>
            {products.map((product) => (
                <ProductCard {...product} />
            ))}
        </div>
    )
}
