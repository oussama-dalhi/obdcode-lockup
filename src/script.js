const endpoint = "./src/codes_fixes.json";

const searchInput = document.querySelector("#dtc");
const searchButton = document.querySelector("#search-button");
const resultDisplay = document.querySelector(".results-card");

let allCodes = [];
async function loadCodes() {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to load codes");
    }

    allCodes = await response.json();
  } catch (error) {
    resultDisplay.innerHTML = `
      <p class="error">
        Unable to load diagnostic database.
      </p>
    `;
  }
}

loadCodes();

function findCode(code) {
  return allCodes.find(
    dtc => dtc.Code.toUpperCase() === code
  );
}

function showLoading() {
  resultDisplay.innerHTML = `
    <div class="loading">
      <p>Analyzing fault code...</p>
    </div>
  `;
}

function showNotFound(code) {
  resultDisplay.innerHTML = `
    <div class="not-found">
      <h2>${code}</h2>

      <p>
        No diagnostic information found for this code.
      </p>
    </div>
  `;
}

function showResult(dtc) {
  resultDisplay.innerHTML = `
    <div class="fault-header">
      <span class="fault-code">
         ${dtc.Code} 
      </span>

      <span class="severity">
        Powertrain System Code
      </span>
    </div>
    <h2>${dtc.Description}</h2>
    <ul class="fixes">
    <h3 class="fix-header">Possible Fixes</h3>
        ${dtc.CommonFixes
        .map(fix => `<li>- ${fix}</li>`)
        .join("")}
    </ul>
    <a
      href="https://www.google.com/search?q=Fault+Code+${dtc['Code']}"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn More →
    </a>
  `;
}

function searchCode() {
  const code = searchInput.value
    .trim()
    .toUpperCase();

  if (!code) return;

  showLoading();

  setTimeout(() => {
    const result = findCode(code);

    if (!result) {
      showNotFound(code);
      return;
    }

    showResult(result);
  }, 600);
}

searchButton.addEventListener("click", e => {
  e.preventDefault();
  resultDisplay.style.display = "block";
  searchCode();
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    resultDisplay.style.display = "block";
    searchCode();
  }
});
searchInput.addEventListener("input", e => {
    searchInput.value = searchInput.value.toUpperCase();
  }
);
