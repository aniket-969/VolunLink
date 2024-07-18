'use client'
import React from 'react';
interface CustomLoaderProps {
    height?: string;
    width?: string;
}
const Loader: React.FC<CustomLoaderProps> = ({ height = '6rem', width = '6rem' }) => {
    return (
        <div
            className={`loader ease-linear rounded-full border-8 border-t-8 border-gray-200 mx-auto`}
            style={{ height, width }}
        ></div>
    );
};

export default Loader