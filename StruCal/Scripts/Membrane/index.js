var canvas = document.getElementById("canvas");

var membraneOutput = getMembraneOutput();

var drawing = new drawingCreator(canvas);

drawing.setMembraneOutput(membraneOutput).setSxx().updateOutput();

//drawing.setMembraneInput(membraneOutput.InputData).updateInput();

function animate() {
    requestAnimationFrame(animate);
    drawing.renderer.render(drawing.scene, drawing.camera);
    drawing.controls.update();

    drawing.updateText();
    //var textPosition = getTextPosition(0, 0, 0, camera, window.innerWidth, window.innerHeight);
    //console.log(textPosition);
    //createText(textPosition.x, textPosition.y);
}
animate();