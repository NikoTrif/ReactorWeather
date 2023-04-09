import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoords, setSearchSelectToggle } from '../redux/slices/weatherSlices';
import axios from 'axios';
import _ from 'lodash';

import '../styles/sass/search-select.scss';

function SearchSelect(props) {
    const state = useSelector(state => state);
    const [inpVal, setInpVal] = useState('');
    const [inpOneVal, setOneVal] = useState('');
    const [searchedVal, setSearchedVal] = useState([]);
    const [cityResponse, setCityResponse] = useState([]);
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


        // if (world !== undefined) {
        //     if (inpOneVal.length > 0) {
        //         let city = [
        //             ...new Set([
        //                 ...world.filter(ea => ea.city.toLowerCase().includes(searcherVal[0].toLowerCase())),
        //                 ...world.filter(eb => eb.admin_name?.toLowerCase()?.includes(searcherVal[0].toLowerCase())),
        //                 ...world.filter(ec => ec.city_ascii?.toLowerCase().includes(searcherVal[0].toLowerCase()))
        //             ])
        //         ];

        //         if (searcherVal.length > 1) {
        //             city = city.filter(e => e.country.toLowerCase().includes(searcherVal[1].toLowerCase()));
        //         }

        //         if (city.length > 0) {
        //             return city;
        //         }
        //         else {
        //             return [];
        //         }
        //     }
        //     return [];
        // }
        // return [];

        if (inpOneVal.length > 0 && !_.isEqual(searchedVal, searcherVal)) {
            const options = {
                method: 'GET',
                url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
                params: { types: 'CITY', namePrefix: searcherVal[0], limit: 10 },
                headers: {
                    'X-RapidAPI-Key': 'f4f9b7629amsh633a2c4583cc684p1a3033jsn9096a02f2ee2',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                setCityResponse(response.data?.data);
                setSearchedVal(searcherVal);
            }).catch(function (error) {
                console.error(error);
            });
        }
        return cityResponse;
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

    function filteredCitiesSize() {
        let selectSize = 10;
        if (filteredCities.length <= 9) {
            selectSize = filteredCities.length + 1;
        }
        else {
            selectSize = 10;
        }

        return selectSize;
    }

    return (
        <div className='search-select'>
            <div className='ui search'>
                <input
                    autoFocus
                    autoComplete='off'
                    placeholder='Search city'
                    type="text"
                    id='cityInput'
                    onChange={e => { setInpVal(e.target.value) }} onKeyDown={e => { keyDown(e) }}
                    className='prompt my-search' />
            </div>
            <div className='result'>
                <Select filteredCities={filteredCities} selectOnClick={selectOnClick} selectSize={filteredCitiesSize()} />
            </div>
        </div>
    );
}

function Select(props) {
    const { filteredCities, selectOnClick, selectSize } = props;
    if (filteredCities.length > 0) {
        return (
            <select
                name='CitySelect'
                id='citySelect'
                multiple
                autoComplete='false'
                size={selectSize}
                className='select'
            >
                {
                    filteredCities.map((city, i) => {
                        if (filteredCities.length !== 0) {
                            return <option value={`${city.latitude},${city.longitude}`} key={`opt${i}`} onClick={e => {
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