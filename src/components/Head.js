import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';


function Head() {
    const state = useSelector(state => state);
    const [inpVal, setInpVal] = useState('');
    const [inpOneVal, setOneVal] = useState('');
    const { world: { world, loading, error } } = state;

    class Option {
        constructor(lat, lon, city, country) {
            this.lat = lat;
            this.lon = lon;
            this.city = city;
            this.country = country;
        }
    }

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
    let options = [];
    if (inpOneVal === inpVal) {
        filteredCities = LoadInput(inpOneVal, world, loading, error);
        // console.log(filteredCities);
    }
    else {
        filteredCities = [];
    }

    if (filteredCities !== []) {
        filteredCities.map((city, i) => {
            // let opt = new Option(city.lat, city.lng, city.city, city.country);
            // console.log(opt);
            options.push({
                label: city.city + ', ' + city.country,
                value: {
                    lat: city.lat,
                    lon: city.lng
                }
            });
        });
        console.log(options);
    }

    return (
        <div>
            <h1>Reactor Weather</h1>
            <h2><button>Beograd, Srbija</button></h2>
            <input type="text" id='cityInput' onChange={e => { setInpVal(e.target.value) }} />
            <div>
                {/* <select name='CitySelect' id='citySelect' multiple aria-label='multiple select'>{
                    filteredCities.map((city, i) => {
                        if (filteredCities.length !== 0) {
                            return <option value={`${city.lat},${city.lon}`} key={`opt${i}`}>{city.city}, {city.country}</option>
                        }
                    })
                }</select> */}
                <Select aria-label='Select City' options={options} />
            </div>
        </div >
    );
}

export default Head;