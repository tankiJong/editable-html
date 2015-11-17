/// <reference path="Components.ts" />
interface Node {
	insertAfter(newEl: Node): void;
}

Node.prototype.insertAfter = function insertAfter(newEl) {
    var parentEl = this.parentNode;

	if (parentEl.lastChild == this) {
		parentEl.appendChild(newEl);
	} else {
		parentEl.insertBefore(newEl, this.nextSibling);
	}
};


class Generator extends Component {
	constructor(node) {
		super();
		this.node = node;
	}

	protected components: Array<Component> = [];
	public render(): Node {
		return this.node;
	}
	public append(c: Component): void {
		this.components.push(c);
		this.node.appendChild(c.node);
	}

	public remove(pos: number): void {
		var comp = this.components[pos];
		this.node.removeChild(comp.node);
		this.components = this.components.filter((ele, idx) => idx != pos);
	}

	public insertAfter(pos: number, comp: Component): void {
		var part1 = this.components.slice(0, pos);
		part1.push(comp);
		this.components = part1.concat(this.components.slice(pos + 1));
		if (pos != this.components.length - 1) {
			this.node.insertBefore(comp.node, this.components[pos + 1].node)
		} else {
			this.node.appendChild(comp.node);
		}

	}

	public shiftTo(pos1: number, pos2: number): void {
		var comp = this.components[pos1];
		this.remove(pos1);
		this.insertAfter(pos2, comp);
	}
	
	//eventListeners
	private canProcess: boolean;
	private dragEl;
	private releaseEl;
	private line = document.createElement('hr');
	private bindEvents(node: Node): void {
		var self = this;
		function domdrugstart(e) {
			self.canProcess = true;
			self.dragEl = this;

			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData("text/html", this.innerHTML);
		}
		function domdrugenter(e) {
			e.target.classList.add('over');
			self.releaseEl = this;
			this.insertAfter(self.line);
		}
		function domdrugover(e) {
			if (e.preventDefault) {
				e.preventDefault();
			}

			e.dataTransfer.dropEffect = 'move';
			return false;
		}
		function domdrugleave(e) {
			e.target.classList.remove('over');
		}
		function domdrop(e) {
			if (self.line)
				self.line.parentNode.removeChild(self.line);
			if (self.canProcess) {
				self.canProcess = false;
				if (e.stopPropagation) {
					e.stopPropagation();
				}

				if (self.dragEl != this && self.releaseEl != null) {
					self.releaseEl.insertAfter(self.dragEl);
					//document.removeChild(dragEl);
				}

				return false;
			} else {
				if (e.stopPropagation) {
					e.stopPropagation();
				}

				if (self.dragEl != this && self.releaseEl != null) {
					var node = self.dragEl.children[0];
					node.setAttribute('draggable', 'true');
					node.addEventListener("dragstart", domdrugstart, false);
					node.addEventListener('dragenter', domdrugenter, false);
					node.addEventListener('dragover', domdrugover, false);
					node.addEventListener('dragleave', domdrugleave, false);
					node.addEventListener('drop', domdrop, false);
					node.addEventListener('dragend', domdrapend, false);
					addToolBar(dragEl.firstChild);
					releaseEl.insertAfter(dragEl);
					dragEl = null;
					releaseEl = null;
					var placeholder = document.querySelector('.placeholder');
					if (placeholder != null) {
						placeholder.parentNode.removeChild(placeholder);
					}
				}
				return false;
			}
		}
		function domdrapend(e) {
			[].forEach.call(_, function(column) {
				column.classList.remove('over');
				column.style.opacity = '1';
			});
		}
	}
	
	private addToolBar(node:Node){
	var tool = document.createElement('div');
	tool.classList.add('tool');
	tool.innerHTML = '<a class="delete" href="#" style="position: absolute;width: 95%;text-align: right;">delete</a>' //delete button

	var del = tool.getElementsByClassName('delete')[0];
	
	del.addEventListener('click',function(e){
		e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
	},false);
	
	node.appendChild(tool);
	
}


	}


