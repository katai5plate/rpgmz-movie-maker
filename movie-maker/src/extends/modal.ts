import { gs } from "../globalState";

export const initModal = () => {
  const style = document.createElement("style");
  style.textContent = `
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-content {
    background-color: rgba(32, 34, 38, 0.75);
    margin: 15% auto;
    padding: 20px;
    width: 80%;
  }
  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    color: black;
    cursor: pointer;
  }

  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    padding: 20px;
  }
  .gallery-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gallery-item img {
    width: 100px;
    height: auto;
    margin-bottom: 8px;
  }
  .gallery-item span {
    text-align: center;
    font-size: 14px;
  }
`;
  document.head.appendChild(style);

  gs.modal = document.createElement("div");
  gs.modal.setAttribute("class", "modal");
  gs.modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2 class="modal-title"></h2>
    <hr/>
    <div class="modal-body"></div>
  </div>
`;
  document.body.appendChild(gs.modal);

  (gs.modal.querySelector(".close") as HTMLSpanElement).onclick = function () {
    closeModal();
  };

  window.onclick = function (event) {
    if (event.target === gs.modal) {
      closeModal();
    }
  };
};

export const openModal = (
  title: string,
  fn: (node: HTMLDivElement) => void
) => {
  (gs.modal.querySelector(".modal-title") as HTMLHeadingElement).textContent =
    title;
  fn(gs.modal.querySelector(".modal-body") as HTMLDivElement);
  gs.modal.style.display = "block";
};

export const closeModal = () => {
  gs.modal.style.display = "none";
  (gs.modal.querySelector(".modal-title") as HTMLHeadingElement).innerHTML = "";
  (gs.modal.querySelector(".modal-body") as HTMLDivElement).innerHTML = "";
};
