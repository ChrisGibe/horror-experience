import * as rive from "@rive-app/canvas";

export const initRive = () => {
  // Fit to the width and align to the top of the canvas
  let layout = new rive.Layout({
    fit: rive.Fit.FitWidth,
    alignment: rive.Alignment.TopCenter,
  });

  const r = new rive.Rive({
    src: "./assets/halloween.riv",
    // OR the path to a discoverable and public Rive asset
    // src: '/public/example.riv',
    canvas: document.getElementById("canvas"),
    autoplay: true,
    stateMachines: "start",
    // artboard: "Arboard", // Optional. If not supplied the default is selected
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
      const inputs = r.stateMachineInputs("start");

      const path = inputs[0];
      const isDoorHidden = inputs[1];
      const lobby = inputs[2];
      const conference = inputs[3];
      const terrace = inputs[4];

      const delay = (target, boolean) => {
        setTimeout(() => {
          target.value = boolean;
        }, 1000);
      };

      const btnStart = document.getElementById("start");
      const btnConference = document.getElementById("conference-room");
      const btnTerrace = document.getElementById("terrace");
      const btnBackToLobbyFromCr = document.getElementById("back-to-lobby-from-cr");
      const btnBackToLobbyFromTerrace = document.getElementById("back-to-lobby-from-terrace");

      setTimeout(() => {
        btnStart.disabled = false
      }, 6300)

      // Go to lobby at the start
      btnStart.addEventListener("click", () => {
        isDoorHidden.value = true;

        btnConference.disabled = false;
        btnTerrace.disabled = false;
        btnStart.disabled = true;

        delay(lobby, true);
      });

      // Go to conference from lobby
      btnConference.addEventListener("click", () => {
        path.value = 1;
        lobby.value = false;

        btnConference.disabled = true;
        btnTerrace.disabled = true;
        btnBackToLobbyFromCr.disabled = false;

        delay(conference, true);
      });

      // Back to lobby from conference
      btnBackToLobbyFromCr.addEventListener("click", () => {
        conference.value = false;

        btnConference.disabled = false;
        btnTerrace.disabled = false;
        btnBackToLobbyFromCr.disabled = true;

        delay(lobby, true);
      });

      // Go to terrace from lobby
      btnTerrace.addEventListener("click", () => {
        path.value = 2;
        lobby.value = false;

        btnConference.disabled = true;
        btnTerrace.disabled = true;
        btnBackToLobbyFromTerrace.disabled = false;

        delay(terrace, true);
      });

      // Back to lobby from terrace
      btnBackToLobbyFromTerrace.addEventListener("click", () => {
        terrace.value = false;

        btnConference.disabled = false;
        btnTerrace.disabled = false;
        btnBackToLobbyFromTerrace.disabled = true;

        delay(lobby, true);
      });
    },
  });

  // Update the layout
  r.layout = new rive.Layout({fit: rive.Fit.Fill});

  window.addEventListener("resize", () => {
    r.resizeDrawingSurfaceToCanvas();
  });
};
