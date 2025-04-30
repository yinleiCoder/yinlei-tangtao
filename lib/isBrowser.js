// https://ahooks.js.org/zh-CN/guide/blog/ssr
export function isBrowser() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}
