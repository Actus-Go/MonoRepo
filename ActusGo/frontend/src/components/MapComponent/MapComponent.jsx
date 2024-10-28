import React, { memo, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import highlightedCountriesData from "../../data/qa.json";
import { useUser } from "../../customHooks/UserHook";
import MarketIcon from "../../icons/ColoredMarket";
import BrandSideBar from "./BrandSideBar";

const CustomMarker = () => {
  return (
    <div className="w-14 h-14 p-2 box-border rounded-full bg-yellow-400/80 hover:bg-yellow-400/20 transition-all backdrop-blur-sm border-yellow-400 flex items-center justify-center">
      <MarketIcon />
    </div>
  );
};

// Fetch brands from the API
const fetchBrands = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/api/brand/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.brands;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};

// Fetch products from the API
const fetchProducts = async (token) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};

// Doha default location and zoom level for the map
const defaultLocation = [51.602085114397674, 25.234693534723874];
const defaultZoomLevel = 10;

// Function to highlight specified countries on the map
const highlightCountries = (mapInstance, countriesData) => {
  if (!countriesData.features || !Array.isArray(countriesData.features)) {
    console.error("Invalid data format for highlighted countries.");
    return;
  }

  // Add GeoJSON data for highlighted countries to the map
  mapInstance.addSource("highlighted-countries", {
    type: "geojson",
    data: countriesData,
  });

  // Style the fill layer to highlight countries
  mapInstance.addLayer({
    id: "highlighted-countries-layer",
    type: "fill",
    source: "highlighted-countries",
    paint: {
      "fill-color": "#FFA500",
      "fill-opacity": 0.2,
      "fill-outline-color": "yellow",
    },
  });
};

const MapComponent = memo(() => {
  const mapElement = useRef(null); // Reference for the map container
  const [map, setMap] = useState(null);
  const [activeBrandOrProduct, setActiveBrandOrProduct] = useState({
    brand: null,
    product: null,
  });
  const user = useUser();

  // Initialize the map and add highlighted regions and markers
  const initializeMap = (brandsData) => {
    const mapInstance = tt.map({
      key: "D3lMaI5Ss7PAi0jffJ9WfK3aP2nGorJO",
      container: mapElement.current,
      center: defaultLocation,
      style:
        "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAbVluUG4xSU5mN09QZlBRZjthNjUyYTIwZi02ZDcyLTQyN2EtYjNkNS0zYjk1M2RmMjVkOTg=.json",
      zoom: defaultZoomLevel,
      pitch: 90,
    });

    // Add Brand markers based on active products
    const addBrandMarkers = (mapInstance, brands) => {
      brands.forEach((brand) => {
        // Create a container div to render the CustomMarker component
        const customMarkerContainer = document.createElement("div");

        // Render the CustomMarker component into the container
        ReactDOM.render(<CustomMarker />, customMarkerContainer);

        // Create a marker with the custom element
        const marker = new tt.Marker({ element: customMarkerContainer })
          .setLngLat(brand.location.coordinates)
          .addTo(mapInstance);

        // Add click event to log brand details
        customMarkerContainer.addEventListener("click", () => {
          console.log("Brand clicked:", brand);
          setActiveBrandOrProduct({ brand, product: null });
        });
      });
    };

    // When the map fully loads, add highlights and markers
    mapInstance.on("load", () => {
      highlightCountries(mapInstance, highlightedCountriesData);
      addBrandMarkers(
        mapInstance,
        brandsData.map(({ name, location, description, products }) => ({
          name,
          description,
          location,
          products,
        }))
      );
    });

    setMap(mapInstance);
  };

  // Fetch products and initialize map on component mount
  useEffect(() => {
    const fetchAndInitialize = async () => {
      const token = user?.token;
      let allProducts = (await fetchProducts(token)).map((product) => {
        return {
          ...product,
          handleSelectProduct: () =>
            setActiveBrandOrProduct((prev) => {
              return { ...prev, product };
            }),
        };
      });

      const brandsData = (await fetchBrands(token)).map((brand) => {
        return {
          ...brand,
          products: allProducts.filter(
            (product) => product?.brand?.slug == brand.slug
          ),
        };
      });

      console.log(brandsData);

      if (!map) {
        initializeMap(brandsData);
      }
    };
    fetchAndInitialize();
  }, []);

  return (
    <div className="h-screen w-full bg-black relative">
      <BrandSideBar
        handleExit={() =>
          setActiveBrandOrProduct({ brand: null, product: null })
        }
        {...activeBrandOrProduct}
      />
      <div ref={mapElement} className="h-full w-full relative" />
    </div>
  );
});

export default MapComponent;
