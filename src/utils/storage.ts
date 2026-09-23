// setInStorage
export const setInStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
};

//getFromStorage
export const getFromStorage = <T>(
  key: string,
  defaultValue: T | null = null,
): T | null => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    try {
      return JSON.parse(item) as T;
    } catch {
      // Raw (non-JSON) strings such as the auth token
      return item as T;
    }
  } catch {
    return defaultValue;
  }
};

// removeFromStorage
export const removeFromStorage = (key: string): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
};

export function setInSessionStorage(key: string, obj: any) {
  if (!key || typeof window === "undefined") return;

  try {
    sessionStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}
