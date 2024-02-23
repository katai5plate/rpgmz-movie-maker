import { gs } from "./globalState";

export const rgbToHex = ({ r, g, b }) =>
  (Math.round(r * 255) << 16) |
  (Math.round(g * 255) << 8) |
  Math.round(b * 255);

const observeDOMChanges = (selector, rootSelector, callback) => {
  const checkAndObserve = () => {
    const rootElement = document.querySelector(rootSelector);
    if (rootElement && rootElement.shadowRoot) {
      callback(rootElement.shadowRoot);
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            const n = node as Element;
            if ((n.matches && n.matches(selector)) || n.querySelectorAll!) {
              callback(node);
            }
          });
        });
      });
      observer.observe(rootElement.shadowRoot, {
        childList: true,
        subtree: true,
      });
    } else {
      setTimeout(checkAndObserve, 500);
    }
  };

  checkAndObserve();
};

export const watchAndEdit = (selector, editFunction) => {
  observeDOMChanges(selector, "#theatrejs-studio-root", (node) => {
    if (node.matches && node.matches(selector)) {
      editFunction(node);
    } else if (node.querySelectorAll) {
      node.querySelectorAll(selector).forEach(editFunction);
    }
  });
};

export const cleanupUnuseDataFromSavedata = (data) => {
  const result = JSON.parse(JSON.stringify(data));
  const existNames = [...gs.pictures.children.keys()];

  // 未使用オブジェクトを削除
  const sheet = result?.sheetsById?.["シート"];
  const byo = sheet?.staticOverrides?.byObject;
  const tbo = sheet?.sequence?.tracksByObject;
  if (byo)
    Object.keys(byo).forEach((key) => {
      if (!existNames.includes(key)) delete byo[key];
    });
  if (tbo)
    Object.keys(tbo).forEach((key) => {
      if (!existNames.includes(key)) delete tbo[key];
    });

  // 巻き戻しログを削除
  result.revisionHistory = [];

  return result;
};

export const getQueries = <T extends string>(
  ...keys: T[]
): Partial<Record<T, string>> => {
  const queryParams = new URLSearchParams(location.search);
  return keys.reduce((acc, key) => {
    const value = queryParams.get(key);
    if (value !== null) acc[key] = value;
    return acc;
  }, {} as Partial<Record<T, string>>);
};
