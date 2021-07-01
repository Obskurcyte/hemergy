import React, {useState, useCallback, useRef} from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";

import {formatRelative} from 'date-fns';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import mapStyles from "../mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
    width: '45vw',
    height: '60vh'
};

const center = {
    lat: 48.8534,
    lng: 2.3488
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const Map = () => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.maps,
        libraries
    });

    const [markers, setMarkers] = useState([])

    const onMapClick = useCallback((e) => {
        setMarkers(current => [
                ...current,
                {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    time: new Date()
                }
            ],
        )
    }, [])

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14)
    });

    if (loadError) return "Error loading maps"

    if (!isLoaded) return "Loading Map"

    return (
        <div>
            <Search panTo={panTo}/>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{lat: marker.lat, lng: marker.lng}}
                        icon={{
                            url: '/mapMarker.png',
                            scaledSize: new window.google.maps.Size(30,30),
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15, 15)
                        }}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

const Search = ({panTo}) => {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 48.8534,
                lng: () => 2.3488
            },
            radius: 4000 * 1000
        }
    });

    return (
        <div className="search">
        <Combobox onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
                const results = await getGeocode({address})
                const {lat, lng} = await getLatLng(results[0]);
                panTo({lat, lng})
            } catch(err) {
                console.log(err)
            }


        }}>
            <ComboboxInput
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                disabled={!ready}
                placeholder="Enter an adress"
            />
            <ComboboxPopover>
                {status === 'OK' && data.map(({id, description}) => (
                    <ComboboxOption key={id} value={description}/>
                ))}
            </ComboboxPopover>
        </Combobox>
        </div>
    )
}

export default Map;