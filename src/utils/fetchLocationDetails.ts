async function fetchLocationDetails(latitude:number, longitude:number, apiKey?:string) {
  
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`
      ); 
  
      const data = await response.json();
  
      if (data.results.length > 0) {
        const locationDetails = {
          formattedAddress: data.results[0].formatted,
          components: data.results[0].components,
          geometry: data.results[0].geometry,
        };
        return locationDetails;
      } else {
        return { error: "Address not found" };
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return { error: "Error fetching address" };
    }
  }
  
  export { fetchLocationDetails };
  