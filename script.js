function main() {
    const gridContainer = document.querySelector(".grid-container");
    const setSquaresPerSideLabel = document.querySelector(
        "#set-squares-per-side-label"
    );
    const setSquaresPerSideInput = document.querySelector(
        "#set-squares-per-side-input"
    );
    const setModeLabel = document.querySelector("#set-mode-label");
    const setModeSelect = document.querySelector("#set-mode-select");
    const resetButton = document.querySelector("#reset-button");

    // Defaults
    setSquaresPerSideInput.value = 16;
    setModeSelect.value = "fill";
    reset();

    resetButton.addEventListener("click", reset);

    function createGrid() {
        for (let i = 0; i < squaresPerSide; ++i) {
            let row = document.createElement("div");
            row.setAttribute("class", "grid-row");
            for (let j = 0; j < squaresPerSide; ++j) {
                gridSquare = document.createElement("div");
                gridSquare.setAttribute("class", "grid-square");

                if (i === squaresPerSide - 1)
                    gridSquare.classList.add("grid-bottom");
                if (j === squaresPerSide - 1)
                    gridSquare.classList.add("grid-right");

                gridSquare.addEventListener("mouseenter", drawHandler);

                if (mode === "darken") {
                    gridSquare.style.opacity = 0;
                    gridSquare.classList.add("highlight");
                }

                row.appendChild(gridSquare);
            }
            gridContainer.appendChild(row);
        }
    }

    function updateSetSquaresPerSideLabel() {
        setSquaresPerSideLabel.textContent = `Set squares per side (currently ${squaresPerSide}):`;
    }

    function updateSetModeLabel() {
        setModeLabel.textContent = `Set mode (currently "${mode}"):`;
    }

    function drawHandler(e) {
        switch (mode) {
            case "fill":
                e.target.classList.add("highlight");
                break;
            case "random":
                const [red, green, blue] = getRandomRGB();
                e.target.setAttribute(
                    "style",
                    `background-color: rgb(${red}, ${green}, ${blue})`
                );
                break;
            case "darken":
                if (e.target.style.opacity < 1)
                    e.target.style.opacity = `${
                        parseFloat(e.target.style.opacity) + 0.1
                    }`;

                break;
            default:
                throw new Error("Undefined mode");
        }
    }

    function reset() {
        if (
            !setSquaresPerSideInput.checkValidity() ||
            !setSquaresPerSideInput.value
        ) {
            alert("Please set a valid number of squares per side");
        } else if (setModeSelect.value === "") {
            alert("Please set a valid mode");
        } else {
            squaresPerSide = setSquaresPerSideInput.value;
            mode = setModeSelect.value;
            updateSetSquaresPerSideLabel();
            updateSetModeLabel();
            gridContainer.textContent = "";
            createGrid();
        }
    }
}

function getRandomRGB() {
    let rgb = [];
    for (let i = 0; i < 3; ++i) rgb.push(Math.floor(Math.random() * 255));
    return rgb;
}

main();
