import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoords, setSearchSelectToggle } from '../redux/slices/weatherSlices';
import '../styles/sass/search-select.scss';

function SearchSelect(props) {
    const state = useSelector(state => state);
    const [inpVal, setInpVal] = useState('');
    const [inpOneVal, setOneVal] = useState('');
    const { world: { world, loading, error } } = state;
    const { coords: { coords } } = state;
    const { searchSelectToggle: { toggle } } = state;
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
    if (inpOneVal === inpVal) {
        filteredCities = LoadInput(inpOneVal, world, loading, error);
    }
    else {
        filteredCities = [];
    }

    function selectOnClick(optionValue) {
        const coord = optionValue.split(',');
        dispatch(getCoords({ lat: coord[0], lon: coord[1] }));
        dispatch(setSearchSelectToggle(!toggle));
    }

    function keyDown(e) {
        if (e.key === 'Enter') {
            if (filteredCities.length > 0) {
                selectOnClick(`${filteredCities[0].lat},${filteredCities[0].lng}`);
            }
        }
    }

    return (
        <div className='search-select'>
            <div className='ui search'>
                <input
                    autoFocus
                    placeholder='Search city'
                    type="text"
                    id='cityInput'
                    onChange={e => { setInpVal(e.target.value) }} onKeyDown={e => { keyDown(e) }}
                    className='prompt my-search' />
            </div>
            <div className='result'>
                <Select filteredCities={filteredCities} selectOnClick={selectOnClick} />
            </div>
        </div>
    );
}

function Select(props) {
    const { filteredCities, selectOnClick } = props;
    if (filteredCities.length > 0) {
        return (
            <select
                name='CitySelect'
                id='citySelect'
                multiple
                autoComplete='false'

                className='ui search dropdown select'>
                {
                    filteredCities.map((city, i) => {
                        if (filteredCities.length !== 0) {
                            return <option value={`${city.lat},${city.lng}`} key={`opt${i}`} onClick={e => {
                                selectOnClick(e.target.value);
                            }}>{city.city}, {city.country}</option>
                        }
                    })
                }
            </select>
        )
    }
    else {
        return null
    }
}

export default SearchSelect;