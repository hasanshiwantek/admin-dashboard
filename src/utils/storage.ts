// setInStorage
export function setInStorage(key: string, obj: any) {
    if (!key || typeof window === "undefined") return;
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}

//getFromStorage
export function getFromStorage(key: string) {
    if (!key || typeof window === "undefined") return null;
    try {
        const valueStr = localStorage.getItem(key);
        if (!valueStr) return null;
        try {
            return JSON.parse(valueStr);
        } catch {
            return valueStr;
        }
    } catch {
        return null;
    }
}

// removeFromStorage
export function removeFromStorage(key: string) {
    if (!key || typeof window === "undefined") return;
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error(err);
    }
}

export function setInSessionStorage(key: string, obj: any) {
    if (!key || typeof window === "undefined") return;

    try {
        sessionStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}