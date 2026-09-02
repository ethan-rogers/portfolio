import {projectTitles } from "./project-data.js"
import { projectFiles } from "./project-data.js";


// initialize initial project list
export function createProjectList(){

    projectTitles.forEach((project, index) => {
        const button = document.createElement('button');
        
        button.classList.add('projectbutton');
        button.style.overflow = 'hidden'
        button.addEventListener('click', (event) => {
            openProject(project.id)
        })

        const title = document.createElement('p');
        title.textContent = project.title;
        title.classList.add('projecttitle');
        title.id = "projectTitle" + project.id;
        button.appendChild(title);

        const summary = document.createElement('p');
        summary.textContent = project.summary;
        summary.classList.add('projectsummary')
        button.appendChild(summary);

        

        document.getElementById("projectList").append(button);
    });

    initializeDescription();
}



let barPercent = 6;
const interval = 5;
// 0; list is full, 1; half and half, 2; description is full
let position = 0;

// left button click
export function leftArrow(){
    
    if (position == 2) return;

    const projectList = document.getElementById("projectList");
    const projectDescription = document.getElementById("projectDescription");



    let value = 0;
    let goal = 0;

    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log(width/height);

    // if list is full and we are not on vertical
    if (position == 0 && height < width){
        // add right button
        const button = document.getElementById("rightlabel");
        button.classList.add('fa-solid', 'fa-caret-right');

        goal = 50 - barPercent/2;
        position = 1;
        
    }else // description is half open or we are on vertical screen
    {
        // remove left button
        const button = document.getElementById("leftlabel");
        button.classList.remove('fa-solid', 'fa-caret-left');

        if (position == 0){
            const rightButton = document.getElementById("rightlabel");
            rightButton.classList.add('fa-solid', 'fa-caret-right');
        }

        goal = 100 - barPercent;
        value = 50 - barPercent/2;
        position = 2;

    }

    // ellif description is oepn

    const intervalId = setInterval(() => {
        value++; 

        projectList.style.width = (100 - barPercent - value) + "%";
        projectDescription.style.width = value + "%";
        
        if (value >= goal) {
            setDescription();
            clearInterval(intervalId); 
        }
    }, interval);

    // set min width if we expanded 

}

export function rightArrow(){ 
    if (position == 0) return;
    
    const projectList = document.getElementById("projectList");
    const projectDescription = document.getElementById("projectDescription");

    const width = window.innerWidth;
    const height = window.innerHeight;

    let value = 0;
    let goal = 0;

    // if project list is closed and we are not in vertical
    if (position == 2 && width > height){
        // add left button back
        const button = document.getElementById("leftlabel");
        button.classList.add('fa-solid', 'fa-caret-left');

        goal = 50 - barPercent/2;
        position = 1;
        
    }else // description is half open
    {
        // remove right button
        const button = document.getElementById("rightlabel");
        button.classList.remove('fa-solid', 'fa-caret-right');


        goal = 100 - barPercent;
        value = 50 - barPercent/2;

        position = 0;
    }



    // ellif description is oepn

    const intervalId = setInterval(() => {
        value++; 

        projectDescription.style.width = (100 - barPercent - value) + "%";
        projectList.style.width = value + "%";
        
        if (value >= goal) {
            setDescription();
            clearInterval(intervalId); 
        }
    }, interval);


}

function initializeDescription(){
    const projectDescription = document.getElementById("projectDescription");
    projectDescription.style.width = 50 - barPercent/2 + "%";

    const projectList = document.getElementById("projectList");
    projectList.style.width = 50 - barPercent/2 + "%";

    position = 1;
    setDescription();
    position = 0;
    projectDescription.style.width = "0%";
    projectList.style.width = 100 - barPercent + "%";


}

function setDescription(){
    if (position == 1){
        const projectDescription = document.getElementById("projectDescription");
        const computedStyle = window.getComputedStyle(projectDescription);
        const projectDescriptionContent = document.getElementById("projectDescriptionContent")
        projectDescriptionContent.style.minWidth = parseInt(computedStyle.width) - 10 + "px";

        const root = document.documentElement;
        root.style.setProperty('--image-width', computedStyle.width); 
    }
}


// open a project
async function openProject(id){
    const data = projectFiles[id];
    const descriptionDiv = document.getElementById("projectDescriptionContent");
    const response = await fetch(projectFiles[id]);

    if (response.ok){
        descriptionDiv.innerHTML = await response.text();
    }

    descriptionDiv.scrollTop = 0;

     projectTitles.forEach((project, index) =>{
        document.getElementById("projectTitle" + project.id).style.textDecoration = "none";
     });

     document.getElementById("projectTitle" + id).style.textDecoration = "underline";



    if (position == 0){
        leftArrow();
        document.getElementById("projectBarrier").style.width = barPercent + "%";
    }
        

}
