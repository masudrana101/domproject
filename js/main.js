const milestonesData = JSON.parse(data).data;
 
function loadMilestones(){
    const milestones = document.querySelector('.milestones');

    milestones.innerHTML = `${milestonesData
         .map(function(mileston){
        return `<div class="milestone border-b" id= ${mileston._id}>
            <div class="flex">
                <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${mileston._id})"
                /></div>
                <div onclick="openMileston(this, ${mileston._id})">
                    <p>
                        ${mileston.name}
                        <span><i class="fas fa-chevron-down"></i></span>
                    </p>
                </div>
            </div> 
        
    <div class="hidden_panel show">
        
          ${mileston.modules
          .map(function(module){
          return `<div class="module border-b">
          <p>${module.name}</p>

          </div>`;  
          })
          .join("  ")}
          
          </div>
    </div>`;
         })
   .join(" ")}`;

}




function openMileston(milestonElement, id){
    const currentPanel = milestonElement.parentNode.nextElementSibling;
   const showPanel = document.querySelector(".show");
   const active = document.querySelector(".active");

   // first remove previous active classif any[ other than the clicked one]
   if(active && !milestonElement.classList.contains("active")){
    active.classList.remove("active");
   }
   //toggle current click one
   milestonElement.classList.toggle("active");


   // first hide previous panel if open[other then the clicked element]
   if(!currentPanel.classList.contains("show") && showPanel)
       showPanel.classList.remove("show");

    //toggle current element
    currentPanel.classList.toggle("show");

    
   showMilestone(id);

}



function showMilestone(id){
    const milestoneImage = document.querySelector(".milestoneImage");
    const name = document.querySelector(".title");
    const details = document.querySelector(".details");

    milestoneImage.style.opacity = "0";
    milestoneImage.src = milestonesData[id].image;
    name.innerText = milestonesData[id].name;
    details.innerText = milestonesData[id].description;

}

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
    this.style.opacity = "1";
}



function markMileStone(checkbox, id){
    const doneList = document.querySelector(".doneList");
    const milestonesList = document.querySelector(".milestones");
    const item = document.getElementById(id);

     if(checkbox.checked){
        milestonesList.removeChild(item);
        doneList.appendChild(item);
     }else{
        milestonesList.appendChild(item);
        doneList.removeChild(item);
     }

}


loadMilestones();