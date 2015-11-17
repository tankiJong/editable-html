var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var State;
(function (State) {
    State[State["editable"] = 0] = "editable";
    State[State["uneditable"] = 1] = "uneditable";
})(State || (State = {}));
;
var Component = (function () {
    function Component() {
    }
    return Component;
})();
var EditableComponent = (function (_super) {
    __extends(EditableComponent, _super);
    function EditableComponent() {
        _super.apply(this, arguments);
    }
    EditableComponent.prototype.setEditable = function () {
        var nodes = this.node.querySelectorAll('p,h1,h2,h3,h4,h5,img');
        [].forEach.call(nodes, function (ele) {
            ele.setAttribute('contenteditable', 'true');
        });
        console.log('can edit now');
        this.canEdit = true;
    };
    EditableComponent.prototype.setUnEditable = function () {
        var nodes = this.node.querySelectorAll('p,h1,h2,h3,h4,h5,img');
        [].forEach.call(nodes, function (ele) {
            ele.setAttribute('contenteditable', 'true');
        });
        console.log('cant edit now');
        this.canEdit = false;
    };
    return EditableComponent;
})(Component);
var test = (function () {
    function test() {
    }
    test.xx = 3;
    return test;
})();
var Template = (function () {
    function Template(src) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", src);
        xmlHttp.send(null);
        xmlHttp.onreadystatechange = function () {
            if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
                var i, a = document.createElement("div"), b = document.createDocumentFragment();
                a.innerHTML = xmlHttp.response;
                while (i = a.firstChild)
                    b.appendChild(i);
                this.node = b.childNodes[0];
            }
        }.bind(this);
    }
    return Template;
})();
/// <reference path="Template.ts" />
/// <reference path="Components.ts" />
var Content = (function (_super) {
    __extends(Content, _super);
    function Content() {
        _super.call(this);
        this.node = Content.template.node.cloneNode(true);
        this.node.children[0].setAttribute('draggable', true);
        this.setEditable();
    }
    Content.prototype.render = function () {
        return this.node;
    };
    Content.template = new Template('/component/template/content.html');
    return Content;
})(EditableComponent);
/// <reference path="Components.ts" />
Node.prototype.insertAfter = function insertAfter(newEl) {
    var parentEl = this.parentNode;
    if (parentEl.lastChild == this) {
        parentEl.appendChild(newEl);
    }
    else {
        parentEl.insertBefore(newEl, this.nextSibling);
    }
};
var Generator = (function (_super) {
    __extends(Generator, _super);
    function Generator(node) {
        _super.call(this);
        this.components = [];
        this.line = document.createElement('hr');
        this.node = node;
    }
    Generator.prototype.render = function () {
        return this.node;
    };
    Generator.prototype.append = function (c) {
        this.components.push(c);
        this.node.appendChild(c.node);
    };
    Generator.prototype.remove = function (pos) {
        var comp = this.components[pos];
        this.node.removeChild(comp.node);
        this.components = this.components.filter(function (ele, idx) { return idx != pos; });
    };
    Generator.prototype.insertAfter = function (pos, comp) {
        var part1 = this.components.slice(0, pos);
        part1.push(comp);
        this.components = part1.concat(this.components.slice(pos + 1));
        if (pos != this.components.length - 1) {
            this.node.insertBefore(comp.node, this.components[pos + 1].node);
        }
        else {
            this.node.appendChild(comp.node);
        }
    };
    Generator.prototype.shiftTo = function (pos1, pos2) {
        var comp = this.components[pos1];
        this.remove(pos1);
        this.insertAfter(pos2, comp);
    };
    Generator.prototype.bindEvents = function (node) {
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
                }
                return false;
            }
            else {
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
            [].forEach.call(_, function (column) {
                column.classList.remove('over');
                column.style.opacity = '1';
            });
        }
    };
    Generator.prototype.addToolBar = function (node) {
        var tool = document.createElement('div');
        tool.classList.add('tool');
        tool.innerHTML = '<a class="delete" href="#" style="position: absolute;width: 95%;text-align: right;">delete</a>';
        var del = tool.getElementsByClassName('delete')[0];
        del.addEventListener('click', function (e) {
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        }, false);
        node.appendChild(tool);
    };
    return Generator;
})(Component);
/// <reference path="Template.ts" />
/// <reference path="Components.ts" />
var Title = (function (_super) {
    __extends(Title, _super);
    function Title() {
        _super.call(this);
        this.node = Title.template.node.cloneNode(true);
        this.node.children[0].setAttribute('draggable', true);
        this.setEditable();
    }
    Title.prototype.render = function () {
        return this.node;
    };
    Title.template = new Template('/component/template/title.html');
    return Title;
})(EditableComponent);
//# sourceMappingURL=vender.js.map