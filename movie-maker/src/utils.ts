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
