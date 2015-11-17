/// <reference path="Template.ts" />
/// <reference path="Components.ts" />
class Content extends EditableComponent{
	protected static template= new Template('/component/template/content.html'); //how to elegently load it 
	
	
	constructor(){
		super();
		this.node=Content.template.node.cloneNode(true);
		this.node.children[0].setAttribute('draggable',true);
		this.setEditable();	
	}
	public render():Node{
		return this.node;
	}
}