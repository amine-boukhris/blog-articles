const articles = document.querySelectorAll(".article");
// test git
function getAverageColor(imgurl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            ).data;
            let totalRed = 0;
            let totalGreen = 0;
            let totalBlue = 0;
            let pixelCount = 0;
            for (let i = 0; i < imgData.length; i += 4) {
                const red = imgData[i];
                const green = imgData[i + 1];
                const blue = imgData[i + 2];

                totalRed += red;
                totalGreen += green;
                totalBlue += blue;
                pixelCount++;
            }
            const averageRed = Math.round(totalRed / pixelCount);
            const averageGreen = Math.round(totalGreen / pixelCount);
            const averageBlue = Math.round(totalBlue / pixelCount);

            const averageColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;
            resolve(averageColor);
        };
        img.onerror = function () {
            reject(new Error("Error loading image."));
        };

        img.src = imgurl;
    });
}

for (let k = 0; k < articles.length; k++) {
    const article = articles[k];
    const styles = window.getComputedStyle(article);
    const bgImage = styles.getPropertyValue("background-image");
    const imgurl = bgImage.replace(/^url\(['"](.+)['"]\)$/, "$1");
    getAverageColor(imgurl)
        .then((averageColor) => {
            const contrastRatioWhite = tinycolor.readability(
                averageColor,
                "rgb(255, 255, 255)"
            );
            const contrastRatioBlack = tinycolor.readability(
                averageColor,
                "rgb(0, 0, 0)"
            );
            if (contrastRatioBlack > contrastRatioWhite) {
                article.style.color = "black";
            } else {
                article.style.color = "white";
                article.querySelector('h3').style.textShadow =
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px,rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
