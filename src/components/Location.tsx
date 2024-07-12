'use client';

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { fetchLocationDetails } from "@/utils/fetchLocationDetails";

interface Location {
    ISO_3166_1_alpha_2: string;
    ISO_3166_1_alpha_3: string;
    ISO_3166_2: string[];
    _category: string;
    _normalized_city: string;
    _type: string;
    city_district: string;
    continent: string;
    country: string;
    country_code: string;
    county: string;
    postcode: string;
    road: string;
    road_type: string;
    state: string;
    state_code: string;
    state_district: string;
    village: string;
    latitude?: number;
    longitude?: number;
}

interface LocationProps {
    location: Location | undefined;
    setLocation: React.Dispatch<React.SetStateAction<Location | undefined>>;
}

const LocationDetails: React.FC<LocationProps> = ({ location, setLocation }) => {

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedLocation = localStorage.getItem('location');
        if (savedLocation) {
            setLocation(JSON.parse(savedLocation));
        }
        else {
            getLocation();
        }

    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getLocationDetails(latitude, longitude);
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
        }
    };
    // console.log(location)
    
    async function getLocationDetails(latitude: number, longitude: number) {
        try {
            const data = await fetchLocationDetails(latitude, longitude, process.env.NEXT_PUBLIC_LOCATION_API_KEY) as {
                formattedAddress: any;
                components: any;
                geometry: any;
            } | {
                error: string;
            };

            if ('components' in data) {
                const updatedLocation = {
                    ...data.components,
                    latitude,
                    longitude,
                };
                setLocation(updatedLocation);
               
                localStorage.setItem('location', JSON.stringify(updatedLocation));
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setError("Error fetching location details");
        }
    }

    return (
        <div className=''>
            {location ? (
                <div className='text-xs flex flex-col items-center justify-center'>
                    <p>Your current location:</p>
                    <p>{location.village},</p>
                    <p>{location.state},</p>
                    <p>{location.country}</p>
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <p className='flex justify-center items-center'>Please allow location access</p>
            )}
        </div>
    );
}

export default LocationDetails;
