export function callCity(lat, lon) {
    const apiKey = 'bdc_d25b293ef9434e27a8412adc53ec5958';
    return `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${lon}&localityLanguage=en&key=${apiKey}`
}