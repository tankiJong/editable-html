var sortable= function(selector){
  var _parent= document.querySelector(selector);
  var _ = document.querySelectorAll(selector+'>[sortable]');
  var line= document.createElement('hr');
  var canProcess = false;
  var releaseEl=null; 
  [].forEach.call(_ ,function(column){
    column.setAttribute('draggable','true');
    column.addEventListener("dragstart",domdrugstart,false);
    column.addEventListener('dragenter', domdrugenter, false);
    column.addEventListener('dragover', domdrugover, false);
    column.addEventListener('dragleave', domdrugleave, false);
    column.addEventListener('drop', domdrop, false);
    column.addEventListener('dragend', domdrapend, false);    
  });

  function domdrugstart(e) {
    canProcess = true;
    
    dragEl = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html",this.innerHTML);
  }
  function domdrugenter(e) {
    e.target.classList.add('over');
    releaseEl = this;
    this.insertAfter(line);
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
    if(line)
        line.parentNode.removeChild(line);
    if(canProcess){
      canProcess =false;
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      
      if (dragEl != this && releaseEl !=null) {
        releaseEl.insertAfter(dragEl);
        //document.removeChild(dragEl);
      }    
      
      return false;
    } else {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      
      if (dragEl != this && releaseEl!=null) {
        var node = dragEl;
        node.setAttribute('draggable','true');
        node.addEventListener("dragstart",domdrugstart,false);
        node.addEventListener('dragenter', domdrugenter, false);
        node.addEventListener('dragover', domdrugover, false);
        node.addEventListener('dragleave', domdrugleave, false);
        node.addEventListener('drop', domdrop, false);
        node.addEventListener('dragend', domdrapend, false);
        addToolBar(dragEl);  
        releaseEl.insertAfter(dragEl);
        dragEl = null;
        releaseEl = null;
        var placeholder =document.querySelector('.placeholder');
        if(placeholder !=null){
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
}