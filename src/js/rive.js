import gsap from "gsap"
import * as rive from "@rive-app/canvas";
import { Controls } from "./controls";


export const initRive = () => {
  // Fit to the width and align to the top of the canvas
  let layout = new rive.Layout({
    fit: rive.Fit.FitWidth,
    alignment: rive.Alignment.TopCenter,
  });

  const experience = new rive.Rive({
    src: "./experience.riv",
    canvas: document.getElementById("canvas"),
    autoplay: true,
    stateMachines: "game",
    onLoad: () => {
      experience.resizeDrawingSurfaceToCanvas();
      
      const inputs = experience.stateMachineInputs("game");

        
      // Start the game
      const launcher = document.querySelector('.launcher')
      launcher.addEventListener('click', () => {
          gsap.to('.opening', { alpha: 0, zIndex: -1, duration: 2})
          experience?.setBooleanStateAtPath('start_first_scene', true, 'First scene')
          inputs[0].value = true
          const music = document.getElementById('ambient-sound')
          const narration = document.getElementById('narration-sound')
          music.volume = 0.40
          music.play()

          setTimeout(() => {
            experience?.setBooleanStateAtPath('start_second_scene', true, 'Second scene bis')
          }, 8000)

          setTimeout(() => {
            narration.play()
          }, 500)
      })
    },
  });

  // Update the layout
  experience.layout = new rive.Layout({fit: rive.Fit.Fill});

  window.addEventListener("resize", () => {
    experience.resizeDrawingSurfaceToCanvas();
  });
};
