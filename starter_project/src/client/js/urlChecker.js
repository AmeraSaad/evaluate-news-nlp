function checkForUrl(value) {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' +
        '((([a-zA-Z0-9$_.+!*\'(),;?&=-]+(:[a-zA-Z0-9$_.+!*\'(),;?&=-]+)?)@)?' +
        '(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|' +
        '(\\d{1,3}\\.){3}\\d{1,3})' + 
        '(\\:\\d+)?' + 
        '(\\/[-a-zA-Z0-9@:%._+~#=]*)*' + 
        '(\\?[;&a-zA-Z0-9@:%._+~#=]*)?' + 
        '(#[-a-zA-Z0-9@:%._+~#=]*)?$', 
        'i'
    );
    return urlPattern.test(value);
}
export { checkForUrl }

