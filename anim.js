window.onload = function () {
  fadeIn();
};

function fadeIn() {
  bg.style.opacity = 1;
  bg.style.transform = "translateY(0px)";
}

$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});
