const projectStart  = 560;
const experienceStart = 1235;



export function setupScrollCheck(){
    window.addEventListener('scroll', updateUnderLines);
    document.getElementById("about-button").addEventListener("click", (event) =>{
        gotoOffset(0)
    });

    document.getElementById("projects-button").addEventListener("click", (event) =>{
        gotoOffset(projectStart)
    });

    document.getElementById("experience-button").addEventListener("click", (event) =>{
        gotoOffset(experienceStart)
    });
}

function updateUnderLines(){
    const offset = window.pageYOffset;

    if (offset < projectStart){
        document.getElementById("about-button").style.textDecoration = "underline";
        document.getElementById("projects-button").style.textDecoration = "none";
        document.getElementById("experience-button").style.textDecoration = "none";
    }else if (offset < experienceStart){
        document.getElementById("projects-button").style.textDecoration = "underline";
        document.getElementById("about-button").style.textDecoration = "none";
        document.getElementById("experience-button").style.textDecoration = "none";
    }else
    {
        document.getElementById("projects-button").style.textDecoration = "none";
        document.getElementById("about-button").style.textDecoration = "none";
        document.getElementById("experience-button").style.textDecoration = "underline";
    }
}

function gotoOffset(goal){
    console.log("called");
    const interval = 0.01;

    let direction = 0;

    if (goal > window.pageYOffset){
        direction = 1;
    }else if (goal < window.pageYOffset){
        direction = -1;
    }else
    {
        return;
    }

    const intervalId = setInterval(() => {

        console.log("called");
        window.scrollTo(0, window.pageYOffset + direction*22);
        
        if ((window.pageYOffset >= goal && direction === 1) || (window.pageYOffset <= goal && direction === -1)) {
            window.scrollTo(0, goal);
            clearInterval(intervalId); 
        }
    }, interval);

    
    
}