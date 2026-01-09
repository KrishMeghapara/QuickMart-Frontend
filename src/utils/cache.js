// Simple cache implementation
class SimpleCache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value) {
    const expiry = Date.now() + this.ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

export const apiCache = new SimpleCache();

// Cache wrapper for API calls
export const withCache = (fn, key, ttl) => {
  return async (...args) => {
    const cacheKey = `${key}_${JSON.stringify(args)}`;
    const cached = apiCache.get(cacheKey);
    
    if (cached) return cached;
    
    const result = await fn(...args);
    apiCache.set(cacheKey, result);
    return result;
  };
};