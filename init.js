Node.prototype.insertAfter=function insertAfter(newEl)
{
    var parentEl = this.parentNode;
            
     if(parentEl.lastChild == this)
     {
           parentEl.appendChild(newEl);
      }else
      {
           parentEl.insertBefore(newEl,this.nextSibling);
       }            
};

var _ = document.querySelectorAll('.component-list li'); 
var dragEl = null;

var canProcess = false;
  [].forEach.call(_ ,function(column){
    column.setAttribute('draggable','true');
    column.addEventListener("dragstart",domdrugstart,false);
    column.addEventListener('dragenter', domdrugenter, false);
    column.addEventListener('dragover', domdrugover, false);
    column.addEventListener('dragleave', domdrugleave, false);
    column.addEventListener('dragend', domdrapend, false);    
  });

  function domdrugstart(e) {
    var componentType=e.target.getAttribute('type');
    eval('dragEl = new '+componentType+'();');
    dragEl=dragEl.node;
  }
  function domdrugenter(e) {
    e.target.classList.add('over');
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
    var line = document.querySelector('.sortable-list hr');
    if(line)
        line.parentNode.removeChild(line);
  }   
  function domdrapend(e) {
    [].forEach.call(_, function (column) {
      column.classList.remove('over');
       column.style.opacity = '1';
    });
  }     