import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity, fetchCityAction, fetchWeatherAction, getCoords } from '../redux/slices/weatherSlices';

function SearchSelect() {
    const state = useSelector(state => state);
    const [inpVal, setInpVal] = useState('');
    const [inpOneVal, setOneVal] = useState('');
    const [optionVal, setOptionVal] = useState({ city: '', country: '', lat: 0, lon: 0 });
    const { world: { world, loading, error } } = state;
    const { coords: { coords } } = state;
    const dispatch = useDispatch();

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

                console.log(city);

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
    let options = [];
    if (inpOneVal === inpVal) {
        filteredCities = LoadInput(inpOneVal, world, loading, error);
        // console.log(filteredCities);
    }
    else {
        filteredCities = [];
    }

    function selectOnClick(optionValue, city) {
        const coord = optionValue.split(',');
        dispatch(getCoords({ lat: coord[0], lon: coord[1] }));
        // const coord = {
        //     lat: coords[0],
        //     lon: coords[1]
        // }
        // dispatch(changeCity({ name: city.name, country: city.country }))
        // dispatch(fetchWeatherAction(coord));
    }

    return (
        <Fragment>
            <input type="text" id='cityInput' onChange={e => { setInpVal(e.target.value) }} />
            <div>
                <select name='CitySelect' id='citySelect' multiple aria-label='multiple select'>{
                    filteredCities.map((city, i) => {
                        if (filteredCities.length !== 0) {
                            return <option value={`${city.lat},${city.lng}`} key={`opt${i}`} onClick={e => {
                                selectOnClick(e.target.value, { name: city.name, country: city.country });
                            }}>{city.city}, {city.country}</option>
                        }
                    })
                }</select>
            </div>
        </Fragment>
    );
}

export default SearchSelect;