class CollapseItem extends HTMLElement {
  constructor() {
    super();
    this.isShow = false;
    let shadow = this.attachShadow({ mode: "open" });
    let tmpl = document.getElementById("collapse_item_tmpl");
    let cloneTemplate = tmpl.content.cloneNode(true);
    let style = document.createElement("style");
    style.textContent = `
      .title {
        font-size: 28px;
      }
      .content {
        font-size: 16px;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(cloneTemplate);
    this.titleEle = shadow.querySelector(".title");
    this.titleEle.addEventListener("click", () => {
      document.querySelector("zf-collapse").dispatchEvent(
        new CustomEvent("changeName", {
          detail: {
            name: this.getAttribute("name"),
            isShow: this.isShow,
          },
        }),
      );
    });
  }

  static get observedAttributes() {
    // 监控属性的变化
    return ["active", "title", "name"];
  }

  attributeChangedCallback(key, oldVal, newVal) {
    switch (key) {
      case "active":
        this.activeList = JSON.parse(newVal);
        break;
      case "title":
        this.titleEle.innerHTML = newVal;
        break;
      case "name":
        this.name = newVal;
        break;
      default:
        break;
    }
    if (this.activeList && this.name) {
      this.isShow = this.activeList.includes(this.name);
      this.shadowRoot.querySelector(".content").style.display = this.isShow
        ? "block"
        : "none";
    }
  }
}

export default CollapseItem;
