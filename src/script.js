const endpoint = './src/codes.json';
const searchInput = document.querySelector('#dtc');
const searchButton = document.querySelector('#search-button');
const resultDisplay = document.querySelector('.result-field');
const allCodes = [];
fetch(endpoint)
.then(codes => codes.json())
.then(data => allCodes.push(...data));

function findMatches(codeToMatch) {
    if(!codeToMatch) return [];
    const matches = allCodes.filter(dtc => {
        return dtc.Code.toUpperCase().includes(codeToMatch);
    });
       const unique = Array.from(
        new Map(matches.map(d => [d.Code, d])).values()
    );
    return unique;
}

function displayMatchedCode() {
    const dtcValue = searchInput.value.toUpperCase().trim();
    const result = findMatches(dtcValue);
    if (result.length === 0) {
    resultDisplay.innerHTML = `<p class = 'notfound'>No results found</p>`;
    return;
}
    const displayHtml = result.map(dtc => {
        return `
           <h3 class = "code">Fault Code ${dtc.Code} : <br></h3>
           <p class = "description">${dtc.Description}<a href="https://www.google.com/search?q=Fault+Code+${dtc['Code']}" target="_blank">
  Learn more
</a></p>
        `
    }).join('');
    resultDisplay.innerHTML = `<p>Scanning...</p>`;
    setTimeout(() => {
        resultDisplay.innerHTML = displayHtml;
    }, 500);
    
}
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    displayMatchedCode();
});
