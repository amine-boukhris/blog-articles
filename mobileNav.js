// const mobileNavList = document.querySelector(".mobile-nav-list")
const svg1 = document.querySelector(".mobile-nav svg:first-child");
const svg2 = document.querySelector(".mobile-nav svg:last-child");
const svgs = [svg1, svg2];



svgs.forEach((svg) => {
    svg.addEventListener("click", () => {
        if (svg1.style.display == "none") {
            svg1.style.display = "inline-block";
            svg2.style.display = "none";
        } else {
            svg2.style.display = "inline-block";
            svg1.style.display = "none";
        }
    });
});
