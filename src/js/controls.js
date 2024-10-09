import gsap from "gsap"


export class Controls {
    constructor() {

        this.btnConference = document.querySelector('button[data-nav="conference-room"]');
    }

    move(payload, button, ui) {
        button.addEventListener("click", () => {
            console.log(payload.direction.value, payload.direction);
            
            payload.direction[0].value = payload.direction[1];
            payload.from.value = false;

            setTimeout(() => {
                payload.to.value = true;
                ui.classList.remove('visible')
            }, 1000);
        });
    }
}