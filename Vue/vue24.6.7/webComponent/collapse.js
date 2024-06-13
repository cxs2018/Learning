class Collapse extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const tmpl = document.getElementById("collapse_tmpl");
    let cloneTemplate = tmpl.content.cloneNode(true);
    let style = document.createElement("style");
    style.textContent = `
      :host {
        display: flex;
        border: 3px solid #ebebeb;
        border-radius: 5px;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(cloneTemplate);

    let slot = shadow.querySelector("slot");
    slot.addEventListener("slotchange", (e) => {
      this.slotList = e.target.assignedElements();
      this.render();
    });
  }

  static get observedAttributes() {
    // 监控属性的变化
    return ["active"];
  }

  attributeChangedCallback(key, oldVal, newVal) {
    if (key === "active") {
      this.activeList = JSON.parse(newVal);
      this.render();
    }
  }

  render() {
    if (this.slotList && this.activeList) {
      [...this.slotList].forEach((child) => {
        child.setAttribute("active", JSON.stringify(this.activeList));
      });
    }
  }
}

export default Collapse;
