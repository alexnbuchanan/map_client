import { useState } from "react";

const Host_useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    setValue(event.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1IjoiYWIyMzk5IiwiYSI6ImNreXJteW1qcTB2ODkyb2pqb2Zmc2NwczYifQ.bjO5HQbavueQzIkdwcbGFg&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();

      setSuggestions(results?.features);
      // console.log("LOCATION_INFO", suggestions);
      // console.log("LOCATION_INFO2", value);
      // dispatch(
      //   createAccount({ email: emailRef.current.value, name: nameUpdate() })
      // );
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
  };
};

export default Host_useInput;
