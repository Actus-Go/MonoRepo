/* eslint-disable react/display-name */
import { memo, useEffect, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import axios from "axios";
import DetailsPopup from "../DetailsPopup/ DetailsPopup";
import MoreDetailsProduct from "../DetailsPopup/MoreDetailsProduct";


const BrandMarkers = memo(({ map, userLocation}) => {
    const [popupContent, setPopupContent] = useState(null);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const [moreDetailsData, setMoreDetailsData] = useState(null);

    useEffect(() => {
        const addMarkerLocations = async () => {
            if (map && userLocation.lat !== 0 && userLocation.lng !== 0) {
                await fetchAndAddBrandMarkers(map, userLocation);
            }
        };
        addMarkerLocations();
    }, [map, userLocation]);

    const fetchAndAddBrandMarkers = async (map, userLocation) => {
        if (!userLocation || typeof userLocation.lat !== "number" || typeof userLocation.lng !== "number") {
            console.error("Invalid user location provided:", userLocation);
            return;
        }

        const locationArray = [userLocation.lat, userLocation.lng];
        const body = {
            location: locationArray,
            distance: 1000000,
        };

        try {
            const { data: { nearBrands } } = await axios.post("http://localhost:3000/api/guide/near-brands", body);

            nearBrands.forEach((brand) => {
                const marker = new tt.Marker().setLngLat([brand.location.coordinates[0], brand.location.coordinates[1]]).addTo(map);
                if (brand._id) {
                    fetchProductsAndPopup(marker, brand);
                }
            });
        } catch (error) {
            console.error("Error fetching near brands:", error);
        }
    };

    const fetchProductsAndPopup = async (marker, brand) => {
        try {
            const { data: { products } } = await axios.get(`http://localhost:3000/api/guide/${brand._id}/products`);
            const popupContent = products.map(product => (
                <DetailsPopup key={product.id} brand={brand} product={product} onMoreDetails={handleMoreDetails} />
            ));
            setPopupContent(popupContent);
            marker.getElement().addEventListener('click', () => {
                setShowDetailsPopup(true);
                setShowMoreDetails(false);
            });
        } catch (err) {
            console.log("Error fetching products:", err);
        }
    };

    const handleMoreDetails = (productDetails) => {
        setMoreDetailsData(productDetails);
        setShowDetailsPopup(false);
        setShowMoreDetails(true);
    };

    const handleCloseMoreDetails = () => {
        setMoreDetailsData(null);
        setShowDetailsPopup(true);
        setShowMoreDetails(false);
    };

    return (
        <div>
            {showDetailsPopup && popupContent}
            {showMoreDetails && moreDetailsData && (
                <MoreDetailsProduct data={moreDetailsData} closePopup={handleCloseMoreDetails} />
            )}
        </div>
    );
});

export default BrandMarkers;
