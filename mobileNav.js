const mobileNavList = document.querySelector(".mobile-nav-links")
const svg1 = document.querySelector(".mobile-nav .svg1");
const svg2 = document.querySelector(".mobile-nav .svg2");
const svgs = [svg1, svg2];



svgs.forEach((svg) => {
    svg.addEventListener("click", () => {
        if (svg1.style.display == "none") {
            svg1.style.display = "inline-block";
            svg2.style.display = "none";
            mobileNavList.classList.add("hidden")
        } else {
            svg2.style.display = "inline-block";
            svg1.style.display = "none";
            mobileNavList.classList.remove("hidden")
        }
    });
});
