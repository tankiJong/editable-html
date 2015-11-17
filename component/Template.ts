class Template {
	public node: Node;
	constructor(src: string) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", src);
		xmlHttp.send(null);
		xmlHttp.onreadystatechange = function() {
			if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
				var i, a = document.createElement("div"), b = document.createDocumentFragment();
				a.innerHTML = xmlHttp.response;
				while (i = a.firstChild) b.appendChild(i);
				this.node = b.childNodes[0];
			}
		}.bind(this);
	}
}