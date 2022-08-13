/*
 * Animation control
 */
function changeAnimatedState(value) {
    animated = value;
}


/*
 * Slider bar handlers
 */
function updateSliderSpd(sliderAmount) {
    var value = sliderAmount*0.5;
    $("#sliderAmountSpd").html(value.toFixed(1));
    particleSpeed = value;
}

function updateSliderSz(sliderAmount) {
    var value = sliderAmount*0.1;
    $("#sliderAmountSz").html(value.toFixed(1));
    particleSize = value;
}


/*
 * Page-load handler
 */
$(function() {
  var colorPalette = [
        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ];

    $("#colorPicker").spectrum({
        color: "#ffe599",
        showPaletteOnly: true,
        togglePaletteOnly: true,
        hideAfterPaletteSelect: true,
        palette: colorPalette,
        change: function(color) {
            var color_ = color.toRgb();
            $("#colorText").html(color.toHexString());
            particleColor = [color_.r/255.0, color_.g/255.0, color_.b/255.0];
        }
    });

    webGLStart();
});
