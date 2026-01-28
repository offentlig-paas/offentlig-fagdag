// Base SVG Component class
class SvgIcon extends HTMLElement {
	async loadSvg(path) {
		try {
			const response = await fetch(path);
			const svgText = await response.text();
			const parser = new DOMParser();
			const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
			const svgElement = svgDoc.querySelector("svg");

			if (svgElement) {
				svgElement.setAttribute("width", "11em");
				svgElement.setAttribute("height", "11em");
				svgElement.querySelectorAll("path").forEach((path) => {
					path.setAttribute("fill", "currentColor");
				});
				this.innerHTML = svgElement.outerHTML;
			}
		} catch (error) {
			console.error(`Failed to load SVG from ${path}:`, error);
		}
	}
}

customElements.define(
	"icon-man1",
	class Man1Icon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/man1.svg");
		}
	},
);
customElements.define(
	"icon-man2",
	class Man2Icon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/man2.svg");
		}
	},
);
customElements.define(
	"icon-man3",
	class Man3Icon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/man3.svg");
		}
	},
);
customElements.define(
	"icon-man4",
	class Man4Icon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/man4.svg");
		}
	},
);
customElements.define(
	"icon-man5",
	class Man5Icon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/man5.svg");
		}
	},
);
customElements.define(
	"icon-man6",
	class Man6Icon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/man6.svg");
		}
	},
);
customElements.define(
	"icon-man7",
	class Man7Icon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/man7.svg");
		}
	},
);
customElements.define(
	"icon-manserpaakart",
	class ManSerpaaKartIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/mannserpåkart.svg");
		}
	},
);
customElements.define(
	"icon-kaffekopp",
	class KaffekoppIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/kaffekopp 1.svg");
		}
	},
);
customElements.define(
	"icon-kaffekoppenkel",
	class KaffekoppEnkelIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/Kaffekoppenkel.svg");
		}
	},
);
customElements.define(
	"icon-kaffekopper",
	class KaffekopperIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/kaffekopper 1.svg");
		}
	},
);
customElements.define(
	"icon-kattekopp",
	class KattekoppIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/kattekopp.svg");
		}
	},
);
customElements.define(
	"icon-pc",
	class PCIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/PC.svg");
		}
	},
);
customElements.define(
	"icon-mikrofon",
	class MikrofonIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/Mikrofon.svg");
		}
	},
);
customElements.define(
	"icon-katteskjerm",
	class KatteskjermIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/Katteskjerm.svg");
		}
	},
);
customElements.define(
	"icon-ben",
	class BenIcon extends SvgIcon {
		connectedCallback() {
			this.loadSvg("img/Ben.svg");
		}
	},
);
