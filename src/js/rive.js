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
        // artboard: "Arboard", // Optional. If not supplied the default is selected
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
        },
    });

    // Update the layout
    r.layout = new rive.Layout({ fit: rive.Fit.Fill });
}