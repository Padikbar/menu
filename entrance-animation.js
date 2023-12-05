document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");

    // Show overlay
    overlay.style.opacity = 1;

    // Hide overlay and show main content after a delay
    setTimeout(function () {
        overlay.style.opacity = 0;
        setTimeout(function () {
            overlay.style.display = "none";
        }, 1000);
    }, 2500);

    setTimeout(function () {
        overlay.remove(); 
    }, 3500);

    

    // You can add more actions here if needed
});