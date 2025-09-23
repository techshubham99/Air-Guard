import { LngLatLike } from 'mapbox-gl';

const MAPBOX_API_KEY = 'YOUR_MAPBOX_API_KEY'; // Replace with your Mapbox API key

export interface GeocodingResult {
  place_name: string;
  center: LngLatLike;
}

export const geocode = async (query: string): Promise<GeocodingResult[]> => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_API_KEY}`
  );
  const data = await response.json();
  return data.features;
};

export const reverseGeocode = async (coords: LngLatLike): Promise<GeocodingResult> => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${MAPBOX_API_KEY}`
  );
  const data = await response.json();
  return data.features[0];
};