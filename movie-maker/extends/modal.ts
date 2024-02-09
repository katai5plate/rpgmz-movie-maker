let modal: HTMLDivElement;

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
    background-color: rgba(0,0,0,0.4);
  }
  .modal-content {
    background-color: gray;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
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
`;
  document.head.appendChild(style);

  modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2 class="modal-title"></h2>
    <hr/>
    <div class="modal-body"></div>
  </div>
`;
  document.body.appendChild(modal);

  (modal.querySelector(".close") as HTMLSpanElement).onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

export const openModal = (
  title: string,
  fn: (node: HTMLDivElement) => void
) => {
  (modal.querySelector(".modal-title") as HTMLHeadingElement).textContent =
    title;
  fn(modal.querySelector(".modal-body") as HTMLDivElement);
  modal.style.display = "block";
};
