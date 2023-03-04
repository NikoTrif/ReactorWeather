export function CalculateTemp(unit, value) {
    if (unit === "C") {
        return Math.floor(value - 273.15);
    }
    else if (unit === "F") {
        return Math.floor((value - 273.15) * (9 / 5) + 32);
    }
}