import React, { useState } from "react";
import ProductsWrapper from "./ProductsWrapper";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { products } from "./data";

const filterProducts = (products, filters) => {
  return products.filter((product) => {
    const meetsPrice = filters.price ? product.salary <= filters.price : true;
    const meetsCategory = filters.category
      ? product.category === filters.category
      : true;
    const meetsDelivery = filters.deliveryFee
      ? product.deliveryFee <= filters.deliveryFee
      : true;
    return meetsPrice && meetsCategory && meetsDelivery;
  });
};

const Products = () => {
  const [filters, setFilters] = useState({
    price: "",
    category: "",
    deliveryFee: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const filteredProducts = filterProducts(products, filters);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1);
  };

  return (
    <div className="w-full md:w-[calc(100%-86px)] md:ml-auto gap-6 mt-10 md:gap-24 flex flex-col p-6 md:p-12 pt-16 bg-black">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <h1 className="text-3xl font-bold mb-4 text-white">Products</h1>

        <Filters filters={filters} handleFilterChange={handleFilterChange} />
      </div>

      <ProductsWrapper products={currentProducts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Products;
