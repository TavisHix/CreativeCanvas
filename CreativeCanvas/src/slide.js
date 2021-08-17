const toolsSlide = () => {
    const burger = document.querySelector('.burger');
    const toolOptions = document.querySelectorAll('.tools li');
    const tools = document.getElementById("tools");
    let display = getComputedStyle(tools).display;
    let open = false;

    burger.addEventListener('click',() => {
        //Toggle tools
        if(open){
            tools.style.display = "none";
            tools.style.width = "0px";
            open = false;
        }else {
            tools.style.width = "250px";
            open = true;
            tools.style.display = "flex";
        }
        //Animate Links
        toolOptions.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = ''
            } else {
             link.style.animation = `toolsFade 0.5s ease forwards ${index / 7 + 1}s`
            }
         });

         //Burger Animation
         burger.classList.toggle('toggle');
    })
}

const screenResize = () => {
    window.addEventListener('resize', () => {
        console.log(open);
        if(window.screen.width > 768){
            tools.style.display = "flex";
            tools.style.width = "40%";
        } else{
            tools.style.display = "none";
            tools.style.width = "0px";
        }
    }, false)
}

const app = () => {
    toolsSlide();
    screenResize();
}

app();