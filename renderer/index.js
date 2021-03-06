var d3 = require("d3"),
    patterns = require("./patterns.js"),
    textWrapper = require("./text-wrapper.js");
    $ = require("jquery")

module.exports = function(t) {

  var renderer = {},
      backgroundImage,
      wrapText,
      theme;

  renderer.backgroundImage = function(_) {
    if (!arguments.length) return backgroundImage;
    backgroundImage = _;
    return this;
  };

  renderer.theme = function(_) {
    if (!arguments.length) return theme;

    theme = _;

    // Default colors
    theme.backgroundColor = theme.backgroundColor || "#fff";
    theme.waveColor = theme.waveColor || theme.foregroundColor || "#000";
    theme.captionColor = theme.captionColor || theme.foregroundColor || "#000";

    // Default wave dimensions
    if (typeof theme.waveTop !== "number") theme.waveTop = 0;
    if (typeof theme.waveBottom !== "number") theme.waveBottom = theme.height;
    if (typeof theme.waveLeft !== "number") theme.waveLeft = 0;
    if (typeof theme.waveRight !== "number") theme.waveRight = theme.width;

    wrapText = textWrapper(theme);

    return this;
  };

  // Draw the frame
  renderer.drawFrame = function(context, options){

    context.patternQuality = "best";

    // Draw the background image and/or background color
    context.clearRect(0, 0, theme.width, theme.height);

    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, theme.width, theme.height);

    if (backgroundImage) {
      context.drawImage(backgroundImage, 0, 0, theme.width, theme.height);
    }

    patterns[theme.pattern || "wave"](context, options.waveform, theme);

    // Write the caption
    if (options.caption) {
      wrapText(context, options.caption);
    }

    return this;

  };

  if (t) {
    renderer.theme(t);
  }

  $(document).ready(function() {
    $(function () {
      //Do my stuff

  document.getElementById('inp').onchange = function(e) {
    var img = new Image();
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
  };
    });
});

  function draw() {
  var canvas = document.getElementById('canvasId');
  const canvasContext = canvas.getContext("2d");
const ratio = this.width / this.height;
let newWidth = canvas.width;
let newHeight = newWidth / ratio;
if (newHeight < canvas.height) {
newHeight = canvas.height;
newWidth = newHeight * ratio;
}
const xOffset = newWidth > canvas.width ? (canvas.width - newWidth) / 2 : 0;
const yOffset =
newHeight > canvas.height ? (canvas.height - newHeight) / 2 : 0;
canvasContext.drawImage(this,480, 200, 300, 300);
}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}


  return renderer;

}
