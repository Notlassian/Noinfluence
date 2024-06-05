export function checkStr(fileName, maxLength) {

    fileName = fileName.trim();

    const regex = /^[a-zA-Z0-9][a-zA-Z0-9_\- ]+$/;

    if (fileName.length > maxLength) {
        return false;
    }
    
    return regex.test(fileName);
}