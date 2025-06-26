function main() {
    const gridContainer = document.querySelector(".grid-container");
    const button = document.querySelector("button");

    createGrid(16);

    button.addEventListener("click", () => {
        n = parseInt(prompt("Enter new squares per side"));
        while (n < 1 || n > 100) {
            n = parseInt(
                prompt("Sorry, choose a different number (1 <= n <= 100)")
            );
        }
        if (n) {
            gridContainer.textContent = "";
            createGrid(n);
        }
    });

    function createGrid(squaresPerSide) {
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

                gridSquare.addEventListener("mouseenter", (e) => {
                    e.target.classList.add("highlight");
                });

                row.appendChild(gridSquare);
            }
            gridContainer.appendChild(row);
        }
        updateButtonText(squaresPerSide);
    }

    function updateButtonText(squaresPerSide) {
        button.textContent = `Set squares per side (currently ${squaresPerSide})`;
    }
}

main();
