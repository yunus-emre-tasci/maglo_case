/**
 * Local storage utilities with error handling
 */

/**
 * Safe localStorage get
 */
export function getStorageItem(key: string, defaultValue: any = null): any {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage item "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safe localStorage set
 */
export function setStorageItem(key: string, value: any): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting localStorage item "${key}":`, error);
    return false;
  }
}

/**
 * Safe localStorage remove
 */
export function removeStorageItem(key: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage item "${key}":`, error);
    return false;
  }
}

/**
 * Clear all localStorage
 */
export function clearStorage(): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
}

/**
 * Get storage size
 */
export function getStorageSize(): number {
  if (typeof window === "undefined") return 0;

  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
}

/**
 * Check if storage is available
 */
export function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Session storage utilities
 */
export function getSessionItem(key: string, defaultValue: any = null): any {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting sessionStorage item "${key}":`, error);
    return defaultValue;
  }
}

export function setSessionItem(key: string, value: any): boolean {
  if (typeof window === "undefined") return false;

  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting sessionStorage item "${key}":`, error);
    return false;
  }
}

export function removeSessionItem(key: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing sessionStorage item "${key}":`, error);
    return false;
  }
}

export function clearSession(): boolean {
  if (typeof window === "undefined") return false;

  try {
    sessionStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
    return false;
  }
}

/**
 * Cookie utilities
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
}

export function setCookie(
  name: string,
  value: string,
  days: number = 7,
  path: string = "/"
): void {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${path}`;
}

export function deleteCookie(name: string, path: string = "/"): void {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
}
