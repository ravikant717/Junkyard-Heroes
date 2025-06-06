export const getUserLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by your browser");
  }

  // Wrap geolocation in a promise-like structure using async/await
  const getPosition = async () => {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  try {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await res.json();

    const city =
      data.address.city || data.address.town || data.address.village || "";
    const state = data.address.state || "";
    const address = `${city}${city && state ? ", " : ""}${state}`;

    return address;
  } catch (err) {
    if (err.code === 1) {
      // PERMISSION_DENIED
      throw new Error("Location permission denied");
    }
    throw new Error("Failed to fetch location");
  }
};
