import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SelectorOptions from './SelectorOptions';

function Head() {
    const state = useSelector(state => state);
    const [inpVal, setInpVal] = useState('');
    const [inpOneVal, setOneVal] = useState('');
    const { world: { world, loading, error } } = state;

    useEffect(() => {
        const timeOutValue = setTimeout(() => {
            setOneVal(inpVal)
        }, 500);
        return () => clearTimeout(timeOutValue);
    }, [inpVal, inpOneVal]);

    function LoadInput(inpOneVal, world, loading, error) {
        let searcherVal = inpOneVal
            .replaceAll(',', '$')
            .replaceAll('$ ', '$')
            .split('$');

        if (world !== undefined) {
            if (inpOneVal.length > 0) {
                let city = [
                    ...new Set([
                        ...world.filter(ea => ea.city.toLowerCase().includes(searcherVal[0].toLowerCase())),
                        ...world.filter(eb => eb.admin_name?.toLowerCase()?.includes(searcherVal[0].toLowerCase())),
                        ...world.filter(ec => ec.city_ascii?.toLowerCase().includes(searcherVal[0].toLowerCase()))
                    ])
                ];

                if (searcherVal.length > 1) {
                    city = city.filter(e => e.country.toLowerCase().includes(searcherVal[1].toLowerCase()));
                }

                // console.log(city);

                if (city.length > 0) {
                    return city;
                }
                else {
                    return [];
                }
            }
            return [];
        }
        return [];
    }
    let filteredCities = [];
    if (inpOneVal.length !== 0) {
        filteredCities = LoadInput(inpOneVal, world, loading, error);
    }
    // console.log(filteredCities);

    return (
        <div>
            <h1>Reactor Weather</h1>
            <h2><button>Beograd, Srbija</button></h2>
            <input type="text" id='cityInput' onChange={e => { setInpVal(e.target.value) }} />
            <div>
                <select name='CitySelect' id='citySelect' multiple aria-label='multiple select'>{
                    filteredCities.map((city, i) => {
                        if (filteredCities.length !== 0) {
                            return <SelectorOptions
                                lat={city.lat}
                                lon={city.lon}
                                city={city.city}
                                country={city.country} />
                        }
                        if (i === filteredCities.length - 1) {
                            filteredCities = [];
                        }
                    })
                }</select>
            </div>
        </div>
    );
}

export default Head;