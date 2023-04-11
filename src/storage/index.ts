// 封装一个本地缓存的工具函数

// 1. 设置本地缓存
export const setItem = (key: string, value: any) => {
  // 1.1 判断value是不是对象
  if (typeof value === "object") {
    // 1.2 对象转换成字符串
    value = JSON.stringify(value);
  }
  // 1.3 设置本地缓存
  localStorage.setItem(key, value);
};

// 2. 获取本地缓存
export const getItem = (key: string) => {
  // 2.1 获取本地缓存
  const data = localStorage.getItem(key);
  // 2.2 判断data是不是JSON格式字符串
  if (data === null) {
    return {};
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

// 3. 删除本地缓存
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

const PROXY_URL_KEY = "PROXY_URL_KEY";
const API_KEY = "API_KEY";
const USE_STEAM = "USE_STEAM";
const LOCAL_LANGUAGE = "LOCAL_LANGUAGE";
const LOCAL_THEME_KEY = "LOCAL_THEME_KEY";
