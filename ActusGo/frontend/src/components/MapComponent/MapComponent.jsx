import React, { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import ZoomButtons from "../Buttons/ZoomButtons";
import UserLocation from "./UserLocation";
import BrandMarkers from "./BrandMarkers";
import useInitializeSocket from "../../socket";
import { SharedDataContext } from "../../SharedDataProvider";
import Notification from "./Notification";

const defaultLocation = [31.383653, 36.726038]; // Default map center location
const defaultZoomLevel = 15; // Default map zoom level to show 1000 meters

const MapComponent = memo(() => {
  const mapElement = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [noProductShare, setNoProductShare] = useState(false);
  const [userRequest, setUserRequest] = useState(null); 
  const [userName, setUserName] = useState(null); 
  const [checkoutUrl, setCheckoutUrl] = useState(null); 
  const [clickAccept, setClickAccept] = useState(false); 
  const [clickReject, setClickReject] = useState(false);
  const [codePart, setCodePart] = useState(null);
  const [notification, setNotification] = useState(null);
 
  // Context
  const { sharedProduct } = useContext(SharedDataContext);
  
  const socket = useInitializeSocket();
    // Function to request split
    const requestSplit = () => {
        if (socket && sharedProduct) {
          socket.emit("requestToShare", {
            id: `${sharedProduct.sharedProduct}`,
          });
        } else {
          console.error('Socket is not initialized');
        }
      };
    
      // Function to handle accept action
      const onAccept = () => {
        setClickAccept(true);
        setClickReject(false);
        setNotification(null);
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      };
    
      // Function to handle reject action
      const onReject = () => {
        setClickReject(true);
        setClickAccept(false);
        setNotification(null);
      };
    
      // Event handlers for socket events
      const handleRequestToShareEvent = (data) => {
        setNotification(data.message);
        setUserName(data.user);
        setUserRequest((prevUserRequest) => data.userRequest || prevUserRequest);
      };
    
      const handlePaidOrder = (data) => {
        setCodePart(data.codePart);
      };
    
      // Socket event listeners
      socket.on("requestToShare", handleRequestToShareEvent);
    
      const AcceptShare = (data) => {
        if (data) {
          setCheckoutUrl(data.checkoutUrl.url); 
        } else {
          console.error('AcceptShare does not contain message:', data);
        }
      };
    
      // Effect hooks
     useCallback(() => {
        if (clickAccept && userRequest && sharedProduct.sharedProduct) {
          socket.emit("acceptToSplit", { id: `${userRequest}` });
          socket.on("acceptToSplit", handleRequestToShareEvent);
          socket.on("payForSplitedOrder", AcceptShare);
          socket.on("paidOrder", handlePaidOrder);
          socket.on("accept", AcceptShare);
        }
        return () => {
          socket.off("acceptToSplit", handleRequestToShareEvent);
          socket.off("payForSplitedOrder", AcceptShare);
          socket.off("accept", AcceptShare);
          socket.off("paidOrder", handlePaidOrder);
        };
      }, [clickAccept]);
    
      useCallback(() => {
        if (clickAccept && userRequest) {
          socket.emit("accept", { id: `${userRequest}` });
          socket.on("requestToShare", handleRequestToShareEvent);
          socket.on("paidOrder", handlePaidOrder);
        }
        return () => {
          socket.off("requestToShare", handleRequestToShareEvent);
          socket.off("paidOrder", handlePaidOrder);
        };
      }, [clickAccept]);
    
      useCallback(() => {
        if (clickReject && userRequest) {
          socket.emit("reject", { id: `${userRequest}` });
          socket.on("requestToShare", handleRequestToShareEvent);
        }
        return () => {
          socket.off("requestToShare", handleRequestToShareEvent);
        };
      }, [clickReject]);

  const isMobileOrTablet = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipad|ipod|blackberry|windows phone|iemobile|wpdesktop/i.test(userAgent);
  };

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = tt.map({
        key: "D3lMaI5Ss7PAi0jffJ9WfK3aP2nGorJO",
        container: mapElement.current,
        center: defaultLocation,
        zoom: defaultZoomLevel,
        pitch: 90,
        dragPan: !isMobileOrTablet(),
        style: "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAbVluUG4xSU5mN09QZlBRZjthNjUyYTIwZi02ZDcyLTQyN2EtYjNkNS0zYjk1M2RmMjVkOTg=.json",
      });
      setMap(mapInstance);

      return () => mapInstance.remove();
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  useEffect(()=>{
    if (map) {
        socket.emit("allSharedProducts");
    
        socket.on("allSharedProducts", (data) => {
          if (data && data.length > 0) {
            setProducts(data);
            setShowAllProducts(true);
          } else {
            setProducts(data);
            setNoProductShare(true);
          }
        });
      }
  }, [])
 

  useCallback(() => {
    if (products.length > 0 ) {
      products.forEach((item, index) => {
        const marker = new tt.Marker()
          .setLngLat([item.user.lastLocation.coordinates[0], item.user.lastLocation.coordinates[1]])
          .addTo(map);

        const popupContent = document.createElement("div");
        popupContent.style.backgroundColor = "#EFFF55";
        popupContent.style.padding = ".5rem";

        const userInfo = document.createElement("p");
        userInfo.style.color = "#000";
        userInfo.style.fontWeight = "bold";
        userInfo.style.marginBottom = ".5rem";
        userInfo.style.padding = ".5rem";
        userInfo.innerText = `${item.user.firstName} ${item.user.lastName}`;
        popupContent.appendChild(userInfo);

        const productInfo = document.createElement("h4");
        productInfo.style.color = "#000";
        productInfo.style.fontWeight = "bold";
        productInfo.style.marginBottom = ".5rem";
        productInfo.style.padding = ".5rem";
        productInfo.innerText = item.product.name;
        popupContent.appendChild(productInfo);

        const viewButton = document.createElement("button");
        viewButton.className = "viewBtn";
        viewButton.style.color = "#EFFF55";
        viewButton.style.fontWeight = "bold";
        viewButton.style.backgroundColor = "#000";
        viewButton.style.padding = ".5rem";
        viewButton.style.borderRadius = "1rem";
        viewButton.style.textAlign = "center";
        viewButton.style.marginLeft = "2rem";
        viewButton.style.fontSize = "16px";
        viewButton.style.outline = "none";
        viewButton.dataset.index = index;
        viewButton.innerText = "View";
        viewButton.addEventListener('click', () => handleViewClick(index));
        popupContent.appendChild(viewButton);

        const popup = new tt.Popup({ offset: 35 }).setDOMContent(popupContent);
        marker.setPopup(popup);
      });
    }
  }, [products, map]);

  const handleZoom = (zoomLevel) => {
    if (map) {
      map.setZoom(zoomLevel);
    }
  };

  const handleViewClick = (index) => {
    viewShareProduct(index);
  };

  const viewShareProduct = (index) => {
    const item = products[index];

    const initialPopupContent = `
      <div style="background-color: #EFFF55; padding:.5rem;">
        <p style="color: #000; font-weight: bold; background-color: #EFFF55; margin-bottom:.5rem; padding:.5rem;">
          ${item.user.firstName} ${item.user.lastName}
        </p>
        <h4 style="color: #000; font-weight: bold; background-color: #EFFF55; margin-bottom:.5rem; padding:.5rem;">
          ${item.product.name}
        </h4>
        <button id="detailsButton${index}" style="color: #EFFF55; font-weight: bold; background-color: #000; padding:.5rem; border-radius:1rem; text-align:center; margin-left:2rem; font-size: 16px; outline: none;">
          See Coupon
        </button>
      </div>
    `;

    const popup = new tt.Popup({ offset: 35 }).setHTML(initialPopupContent);
    const marker = new tt.Marker()
      .setLngLat([item.user.lastLocation.coordinates[0], item.user.lastLocation.coordinates[1]])
      .addTo(map)
      .setPopup(popup)
      .togglePopup();

    const detailsButton = document.getElementById(`detailsButton${index}`);
    if (detailsButton) {
      detailsButton.addEventListener('click', () => showProductDetails(item, marker, index));
    }
  };

  const showProductDetails = (item, marker, index) => {
    const popupDetailsSplit = new tt.Popup({ offset: 10 }).setHTML(
      `<div style=" background-color: #fff; padding:.5rem; color: #000;">
        <div style="background-color: #EFFF55; font-weight: bold; color: #000; padding:.5rem; width:100%; height: 70px; border-radius:1rem;">Image Product</div>
        <p style="font-weight: bold;">${item.product.name}</p>
        <div style="display:grid;">
          <button id="requestSplitBtn${index}" style="background-color: #000; font-weight: bold; color: #EFFF55; padding:.5rem; border-radius:1rem; text-align:center; margin-top:.5rem; font-size: 16px; outline: none;">Request Coupon</button>
          <button id="backButton${index}" style="background-color: #000; font-weight: bold; color: #EFFF55; padding:.5rem; border-radius:1rem; text-align:center; margin-top:.5rem; font-size: 16px; width:100px; outline: none;">Back</button>
        </div>
      </div>`
    );

    marker.setPopup(popupDetailsSplit).togglePopup();

    const backButton = document.getElementById(`backButton${index}`);
    const requestSplitBtn = document.getElementById(`requestSplitBtn${index}`);

    if (backButton) {
      backButton.addEventListener('click', () => {
        viewShareProduct(index);
      });
    }

    if (requestSplitBtn) {
      requestSplitBtn.addEventListener('click', () => requestSplit());
    }
  };



  return (
    <div className="h-[70%] sm:h-[80%] w-full bg-black relative top-[5rem] border-white border-[1px]">
      <div ref={mapElement} className="h-full w-full relative">
        <ZoomButtons handleZoom={handleZoom} />
        <UserLocation setUserLocation={setUserLocation} map={map} showAllProducts={showAllProducts} />
        <BrandMarkers map={map} userLocation={userLocation} />

        {/* Conditional rendering for no product share */}
        {noProductShare && (
          <div className="bg-[#fff] p-[.5rem] absolute top-0 right-0 z-20 rounded-2xl">
            <h4 className="text-[#000] font-bold mb-[.5rem] p-[.5rem]">{products.message}</h4>
            <div className="flex justify-center items-center">
              <button onClick={() => setNoProductShare(false)} className="w-[100px] text-[#EFFF55] p-[.5rem] font-bold bg-[#000] text-[16px] outline-none text-center rounded-[1rem]">OK</button>
            </div>
          </div>
        )}
        {notification && (
            <Notification
              message={notification}
              onAccept={onAccept}
              onReject={onReject}
            />
          )}
          {codePart && (
            <div>
              <p>Your part of the coupon code: {codePart}</p>
            </div>
          )}
      </div>
    </div>
  );
});

export default MapComponent;
