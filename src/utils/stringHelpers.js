export const trimmingAndConvertToArray = (value) => value.replace(/,$/, "").trim().split(",");
export const replaceCommasWithSpaces = (value) => value.replaceAll(/,/gi, " ").trim();
