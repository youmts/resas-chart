import axios from "axios";

const apiCache = new Map();

async function cachedGet(path) {
  if(apiCache.has(path)) {
    return apiCache.get(path);
  }

  const { data } = await axios.get(path);
  apiCache.set(path, data);
  return data;
}

export async function loadPrefectures() {
  return await cachedGet('/api/v1/prefectures');
}

export async function loadPopulations(prefCode) {
  return await cachedGet(`/api/v1/prefectures/${prefCode}/populations`);
}
