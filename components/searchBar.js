import React from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxPopover} from "@reach/combobox";
import {useLoadScript} from "@react-google-maps/api";

const libraries = ["places"];

const SearchBar = () => {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.maps,
        libraries
    });

    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 48.8534,
                lng: () => 2.3488
            },
            radius: 4000 * 1000
        }
    });
    console.log(ready)

    return (
        <div>
            <Combobox onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try {
                    const results = await getGeocode({address})
                    const {lat, lng} = await getLatLng(results[0]);
                    console.log(lat)
                    console.log(lng)
                    panTo({lat, lng})
                } catch(err) {
                    console.log(err)
                }

            }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    style={{width: '100%'}}
                    disabled={!ready}
                    placeholder="Enter the city of your project"
                />
                <ComboboxPopover
                    style={{backgroundColor: 'white', paddingLeft: '1%'}}
                >
                    {status === 'OK' && data.map(({id, description}) => {
                            return (
                                <ComboboxOption key={id} value={description}/>
                            )
                        }
                    )}
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default SearchBar;