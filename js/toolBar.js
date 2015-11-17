var addToolBar = function(node){
	var tool = document.createElement('div');
	tool.classList.add('tool');
	tool.innerHTML = '<a class="delete" href="#" style="position: absolute;width: 95%;text-align: right;">delete</a>' //delete button

	var del = tool.getElementsByClassName('delete')[0];
	
	del.addEventListener('click',function(e){
		e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
	},false);
	
	node.appendChild(tool);
	
}