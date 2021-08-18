var open = false;

const toolsSlide = () => {
    const burger = document.querySelector('.burger');
    const tools = document.getElementById("tools");
    let display = getComputedStyle(tools).display;

    burger.addEventListener('click',() => {
        if(tools.classList.contains("toggle-active")){
            tools.classList.replace("toggle-active", "toggle-inactive");
            this.open = false;
        } else if(tools.classList.contains("toggle-inactive")){
            tools.classList.replace("toggle-inactive", "toggle-active");
            this.open = true;
        } else {
            tools.classList.add("toggle-active");
            this.open = true;
        }
         //Burger Animation
         burger.classList.toggle('toggle');
    })
}

const screenResize = () => {
    const burger = document.querySelector('.burger');
    window.addEventListener('resize', () => {
        console.log(typeof window.innerWidth);
        if(window.innerWidth > 768){
            tools.classList.replace("toggle-inactive", "toggle-active");
            this.open = false;
            if(burger.classList.contains("toggle")){
                burger.classList.toggle('toggle');
            }
        }
        if (window.innerWidth < 768){
            tools.classList.replace("toggle-active", "toggle-inactive")
            console.log("this worked!")
            if(burger.classList.contains("toggle")){
                burger.classList.toggle('toggle');
            }
        } 
    }, false)
}
const app = () => {
    toolsSlide();
    screenResize();
}

app();