import React, { memo, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import highlightedCountriesData from "../../data/qa.json";
import { useUser } from "../../customHooks/UserHook";
import MarketIcon from "../../icons/ColoredMarket";
import BrandSideBar from "./BrandSideBar";
import { useSocket } from "../../socket";
import { useShareRequestUsersStore } from "../../Store/ShareRequestUsersStore";

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
    const response = await axios.get(`${process.env.REACT_APP_MARKET_BACKEND_URL}/api/brand/list`, {
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
    const response = await axios.get(`${process.env.REACT_APP_MARKET_BACKEND_URL}/api/product`, {
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
  const [openClosePopup, setOpenClosePopup] = useState(false);
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
            (product) => product?.brand?.slug === brand.slug
          ),
        };
      });

      if (!map) {
        initializeMap(brandsData);
      }
    };
    fetchAndInitialize();
  }, [map, user]);

  return (
    <div className="h-screen w-full bg-black relative">
      <BrandSideBar
        setOpenClosePopup = {setOpenClosePopup}
        handleExit={() =>
          setActiveBrandOrProduct({ brand: null, product: null })
        }
        {...activeBrandOrProduct}
      />
      <div ref={mapElement} className="h-full w-full relative" />
      {openClosePopup && <ShareProductPopup onClose={()=>{setOpenClosePopup(false)}}/>}
    </div>
  );
});

export default MapComponent;


const ShareProductPopup = ({ onClose }) => {
  const [acceptedUsers,setAcceptedUsers] = useState(0);
  const requests = useShareRequestUsersStore((state)=>state.requests);
  const isLoading = useShareRequestUsersStore((state)=>state.isLoading);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999999999999]">
      <div className="bg-white w-[90%] h-[90%] p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none"
        >
          Close
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Sharing your product</h2>
          <p className="text-sm text-gray-600 mt-1">Grilled Meat</p>
        </div>
        <div>
          <p>Accepted users To share With {acceptedUsers} / total</p>
        </div>

        {/* Skeleton loading list */}
        <div className="space-y-4 mt-4 overflow-y-auto h-[75%]">
          {requests.length > 0 ? requests.map((user)=>{
            return <UserRequest user={user.user} message={user.message} requestId={user.requestId} key={user._id} onAccept={()=>{setAcceptedUsers((prev)=>prev++)}}/>
          }) : Array(3).fill(0).map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              {/* Circle skeleton for user avatar */}
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              {/* Rectangle skeleton for user name */}
              <div className="flex-1 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
      {isLoading && <LoadingOverlay/>}
    </div>
  );
};

function UserRequest({ user, requestId, message, onAccept }) {
  const [finished, setFinished] = useState(false);
  const [isAccepted, setIsAccepted] = useState(null);
  const socket = useSocket();
  const {changeLoading,setAcceptedId} = useShareRequestUsersStore((state)=>state);

  const handleAcceptToShare = () => {
    setFinished(true);
    setIsAccepted(true);
    //set the loading directly to true when the first user is accepted
    changeLoading(true);
    setAcceptedId(requestId);
    socket.emit('accept', {id:requestId});
    socket.on('accept', ({checkoutUrl}) =>{
      changeLoading(false);
      window.location.href = checkoutUrl.url;
    });
  };

  const handleRefuseToShare = () => {
    setFinished(true);
    setIsAccepted(false);
    socket.emit('reject', {id:requestId});
  };

  return (
    <div
      className={`flex items-start space-x-4 p-4 rounded-lg shadow-md w-full
        ${isAccepted === true ? 'border-2 border-green-500' : ''}
        ${isAccepted === false ? 'border-2 border-red-500' : ''}
      `}
    >
      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={user?.avatar}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
        />
        <span className="mt-2 text-sm font-semibold text-gray-800">{`${user?.firstName} ${user?.lastName}`}</span>
      </div>

      {/* Message Section */}
      <div className="flex-1">
        <p className="text-gray-600">{message}</p>
      </div>
      {/* Buttons Section */}
      <div className="flex space-x-2 mt-4">
          <button
            onClick={handleAcceptToShare}
            disabled={finished}
            className={`px-4 py-2 rounded-lg text-white 
              ${finished ? 'cursor-not-allowed opacity-50' : 'bg-green-500 hover:bg-green-600'}
            `}
          >
            Accept
          </button>
          <button
            onClick={handleRefuseToShare}
            disabled={finished}
            className={`px-4 py-2 rounded-lg text-white 
              ${finished ? 'cursor-not-allowed opacity-50' : 'bg-red-500 hover:bg-red-600'}
            `}
          >
            Reject
          </button>
        </div>
    </div>
  );
}
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-stone-500 bg-opacity-10 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-100"></div>
    </div>
  );
}