let form = document.querySelector("form");
let display = document.querySelector("#display");
let resultsBody = document.querySelector("#results-body");
let reflectionText = document.querySelector("#reflection-text");

// Store previous responses for comparison
let previousResponses = [];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let userPrompt = event.target[0].value;
    let temperature = Number(event.target[1].value);
    let maxTokens = Number(event.target[2].value);
    let presencePenelty = Number(event.target[3].value);
    let frequencyPenelty = Number(event.target[4].value);

    // Show loading state
    display.innerHTML = '<div class="loading"></div>';
    
    postData({ userPrompt, temperature, maxTokens, presencePenelty, frequencyPenelty });
});

async function postData(data) {
    try {
        let res = await fetch("http://localhost:8080/data" || "http://localhost:4040/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        let resfrmserver = await res.json();
        
        // Update display with response
        display.textContent = resfrmserver.msg;
        
        // Add to results table
        addToResultsTable(data, resfrmserver.msg);
        
        // Update reflection
        updateReflection(data, resfrmserver.msg);
        
    } catch (error) {
        console.error(error);
        display.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
    }
}

function addToResultsTable(data, response) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.temperature}</td>
        <td>${data.maxTokens}</td>
        <td>${data.presencePenelty}</td>
        <td>${data.frequencyPenelty}</td>
        <td>${response}</td>
    `;
    resultsBody.appendChild(row);
    
    // Store response for reflection
    previousResponses.push({
        ...data,
        response
    });
}

function updateReflection(data, response) {
    if (previousResponses.length < 2) {
        reflectionText.textContent = "Try different parameter combinations to see how they affect the response.";
        return;
    }

    const lastResponse = previousResponses[previousResponses.length - 2];
    let reflection = "";

    // Compare with previous response
    if (data.temperature !== lastResponse.temperature) {
        reflection += `Temperature change from ${lastResponse.temperature} to ${data.temperature} resulted in `;
        reflection += data.temperature > lastResponse.temperature ? 
            "more creative and varied responses. " : 
            "more focused and deterministic responses. ";
    }

    if (data.maxTokens !== lastResponse.maxTokens) {
        reflection += `Increasing max tokens from ${lastResponse.maxTokens} to ${data.maxTokens} allowed for `;
        reflection += data.maxTokens > lastResponse.maxTokens ? 
            "more detailed and comprehensive responses. " : 
            "more concise and focused responses. ";
    }

    if (data.presencePenelty !== lastResponse.presencePenelty) {
        reflection += `Presence penalty adjustment from ${lastResponse.presencePenelty} to ${data.presencePenelty} `;
        reflection += data.presencePenelty > lastResponse.presencePenelty ? 
            "reduced repetition in the response. " : 
            "allowed for more natural repetition of key concepts. ";
    }

    if (data.frequencyPenelty !== lastResponse.frequencyPenelty) {
        reflection += `Frequency penalty change from ${lastResponse.frequencyPenelty} to ${data.frequencyPenelty} `;
        reflection += data.frequencyPenelty > lastResponse.frequencyPenelty ? 
            "encouraged more diverse vocabulary usage. " : 
            "allowed for more consistent terminology throughout the response. ";
    }

    reflectionText.textContent = reflection;
}