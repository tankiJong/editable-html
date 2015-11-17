enum State{editable,uneditable};

abstract class Component {
	public node:any;
	public abstract render():Node;
}

abstract class  EditableComponent extends Component{
protected canEdit:boolean;
	public setEditable():void{
		var nodes = this.node.querySelectorAll('p,h1,h2,h3,h4,h5,img');
		[].forEach.call(nodes,function(ele){
			ele.setAttribute('contenteditable','true');
		});
		console.log('can edit now');
		this.canEdit = true;
	}
	public setUnEditable():void{
		var nodes = this.node.querySelectorAll('p,h1,h2,h3,h4,h5,img');
		[].forEach.call(nodes,function(ele){
			ele.setAttribute('contenteditable','true');
		});
		console.log('cant edit now');
		this.canEdit = false;
	}
}
