/* eslint-disable react/display-name */
import { memo, useCallback, useContext, useEffect, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import { SharedDataContext } from "../../SharedDataProvider";
import {socket} from '../../socket';
import Notification from "./Notification";

const UserLocation = memo(({ setUserLocation, map, showAllProducts }) => {
  // Context
  const { sharedProduct } = useContext(SharedDataContext);

  // State variables
  const [marker, setMarker] = useState(null);
  const [detailsPopup, setDetailsPopup] = useState(null);
  const [notification, setNotification] = useState(null);
  const [userRequest, setUserRequest] = useState(null); 
  const [userName, setUserName] = useState(null); 
  const [checkoutUrl, setCheckoutUrl] = useState(null); 
  const [isAcceptClicked, setIsAcceptClicked] = useState(false); 
  const [isRejectClicked, setIsRejectClicked] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState(null);

  // Function to request product sharing
  const requestProductSharing = useCallback(() => {
    if (socket && sharedProduct) {
      socket.emit("requestToShare", {
        id: `${sharedProduct.sharedProduct}`,
      });
    } else {
      console.error('Socket is not initialized or sharedProduct is missing');
    }
  }, [socket, sharedProduct]);

  // Function to handle accept action
  const handleAccept = useCallback(() => {
    setIsAcceptClicked(true);
    setIsRejectClicked(false);
    setNotification(null);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  // Function to handle reject action
  const onReject = useCallback(() => {
    setIsRejectClicked(true);
    setIsAcceptClicked(false);
    setNotification(null);
  }, []);

  // Event handlers for socket events
  const handleRequestToShareEvent = useCallback((data) => {
    setNotification(data.message);
    setUserName(data.user);
    setUserRequest((prevUserRequest) => data.userRequest || prevUserRequest);
  }, []);

  const handlePaidOrder = useCallback((data) => {
    setCodeSnippet(data.codeSnippet);
  }, []);

  // Socket event listeners
  socket.on("requestToShare", handleRequestToShareEvent);

  const AcceptShare = useCallback((data) => {
    if (data) {
      setCheckoutUrl(data.checkoutUrl.url); 
    } else {
      console.error('AcceptShare does not contain message:', data);
    }
  }, []);

  // Effect hooks
  useEffect(() => {
    if (isAcceptClicked && userRequest && sharedProduct.sharedProduct) {
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
  }, [isAcceptClicked]);

  useEffect(() => {
    if (isAcceptClicked && userRequest) {
      socket.emit("accept", { id: `${userRequest}` });
      socket.on("requestToShare", handleRequestToShareEvent);
      socket.on("paidOrder", handlePaidOrder);
    }
    return () => {
      socket.off("requestToShare", handleRequestToShareEvent);
      socket.off("paidOrder", handlePaidOrder);
    };
  }, [isAcceptClicked]);

  useEffect(() => {
    if (isRejectClicked && userRequest) {
      socket.emit("reject", { id: `${userRequest}` });
      socket.on("requestToShare", handleRequestToShareEvent);
    }
    return () => {
      socket.off("requestToShare", handleRequestToShareEvent);
    };
  }, [isRejectClicked]);

  useEffect(() => {
    const DetailsSharedProduct = () => {
      if (sharedProduct && sharedProduct.sharedProduct) {
        const popupDetailsSplit = new tt.Popup({ offset: 10 }).setHTML(
          `<div style=" background-color: #fff; padding:.5rem; color: #000;">
            <div style="background-color: #EFFF55; font-weight: bold; color: #000; padding:.5rem; width:100%; height: 70px; border-radius:1rem;">Image Product</div>
            <p style="font-weight: bold;">${sharedProduct.message}</p>
            <div style="display:grid;">
              <button id="requestSplitBtn" style="background-color: #000; font-weight: bold; color: #EFFF55; padding:.5rem; border-radius:1rem; text-align:center; margin-top:.5rem; font-size: 16px; outline: none;">Request Coupon</button>
              <button id="backButton" style="background-color: #000; font-weight: bold; color: #EFFF55; padding:.5rem; border-radius:1rem; text-align:center; margin-top:.5rem; font-size: 16px; width:100px; outline: none;">Back</button>
            </div>
          </div>`
        );
        marker.setPopup(popupDetailsSplit).togglePopup();
        setDetailsPopup(popupDetailsSplit);

        setTimeout(() => {
          const backButton = document.getElementById('backButton');
          const requestSplitBtn = document.getElementById('requestSplitBtn');
          if (backButton || requestSplitBtn) {
            backButton.addEventListener('click', showInitialPopup);
            requestSplitBtn.addEventListener('click', requestProductSharing);
          }
        }, 100);
      }
    };

    const showInitialPopup = () => {
      if (sharedProduct) {
        let initialPopupContent;
        if (showAllProducts) {
          initialPopupContent = `<div style=" background-color: #EFFF55; padding:.5rem;">
            <p style="color: #000; font-weight: bold; background-color: #EFFF55; margin-bottom:.5rem; padding:.5rem;">${sharedProduct.message}</p>
            <button id="detailsButton" style="color: #EFFF55; font-weight: bold; background-color: #000; padding:.5rem; border-radius:1rem; text-align:center; margin-left:2rem; font-size: 16px; outline: none;">see coupon</button>
          </div>`;
        } else {
          initialPopupContent = `<div style=" background-color: #EFFF55; padding:.5rem;">
            <p style="color: #000; font-weight: bold; background-color: #EFFF55; margin-bottom:.5rem; padding:.5rem;">${sharedProduct.message}</p>
            <button id="detailsButton" style="color: #EFFF55; font-weight: bold; background-color: #000; padding:.5rem; border-radius:1rem; text-align:center; margin-left:2rem; font-size: 16px; outline: none;">see coupon</button>
          </div>`;
        }
        const initialPopup = new tt.Popup({ offset: 35 }).setHTML(initialPopupContent);
        marker.setPopup(initialPopup).togglePopup();

        setTimeout(() => {
          const detailsButton = document.getElementById('detailsButton');
          if (detailsButton) {
            detailsButton.addEventListener('click', DetailsSharedProduct);
          }
        }, 100);
      }
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          if (map) {
            map.setCenter([longitude, latitude]);

            if (!marker) {
              const newMarker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
              setMarker(newMarker);
            } else {
              marker.setLngLat([longitude, latitude]);
            }

            showInitialPopup();
          }
        },
        (error) => console.error("Error getting user location:", error),
        { enableHighAccuracy: true }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [map, setUserLocation, sharedProduct, marker, showAllProducts]);

  // Add useEffect to handle socket events if needed
  useEffect(() => {
    if (socket) {
      socket.connect(); // Manually connect the socket

      // Handle socket events
      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      // Cleanup on unmount
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.disconnect();
      };
    }
  }, [socket]);

  return (
    <>
      {notification && (
        <Notification
          message={notification}
          onAccept={handleAccept}
          onReject={onReject}
        />
      )}
      {codeSnippet && (
        <div>
          <p>Your part of the coupon code: {codeSnippet}</p>
        </div>
      )}
    </>
  );
});

export default UserLocation;
