import axios from "axios";

export async function LoadWorldCities() {
    let jsonconn = await fetch('../worldcities.json');
    let cities = await jsonconn.json();
    return cities;
}