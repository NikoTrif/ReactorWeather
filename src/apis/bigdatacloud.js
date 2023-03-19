export function callCity(lat, lon) {
    const apiKey = 'bdc_9d55ada394ce43cea64fbc2f74a906df';
    return `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${lon}&localityLanguage=en&key=${apiKey}`
}