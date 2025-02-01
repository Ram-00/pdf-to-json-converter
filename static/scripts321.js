const pdfFile = document.getElementById('pdfFile');
const convertButton = document.getElementById('convertButton');
const resultDiv = document.getElementById('result');
const converterCard = document.querySelector('.converter-card');
const fileChosen = document.getElementById('file-chosen'); // Get the fileChosen element

convertButton.addEventListener('click', () => {
    const file = pdfFile.files[0];

    if (!file) {
        resultDiv.innerHTML = '<div class="error">Please select a PDF file.</div>';
        return;
    }

    resultDiv.innerHTML = '<div class="loading"><span class="loading-text">Converting...</span><div class="lds-dual-ring"></div></div>';
    convertButton.disabled = true;

    const formData = new FormData();
    formData.append('pdf_file', file);

    fetch('/convert', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        convertButton.disabled = false;
        resultDiv.innerHTML = ""; // *** KEY: Clear resultDiv here ***

        if (data.error) {
            resultDiv.innerHTML = `<div class="error">${data.error}</div>`;
        } else {
            const downloadLink = document.createElement('a');
            downloadLink.href = data.download_link;
            downloadLink.textContent = "Download JSON";
            downloadLink.download = data.download_link.split('/').pop(); // Extract filename
            downloadLink.classList.add('download-button');

            resultDiv.innerHTML = `<div class="success">${data.message} </div>`;
            resultDiv.querySelector('.success').appendChild(downloadLink);
        }
    })
    .catch(error => {
        convertButton.disabled = false;
        resultDiv.innerHTML = '<div class="error">An error occurred. Please try again later.</div>';
        console.error("Error:", error);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    converterCard.classList.add('show');
});

pdfFile.addEventListener('change', () => {
    const file = pdfFile.files[0];
    if (file) { // Check if a file is actually selected
        fileChosen.textContent = file.name;
    } else {
        fileChosen.textContent = "No file chosen";
    }

    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
        alert("Please select a PDF file.");
        pdfFile.value = '';
        fileChosen.textContent = "No file chosen";
        return;
    }

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB limit
    if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the limit (20MB).");
        pdfFile.value = '';
        fileChosen.textContent = "No file chosen";
        return;
    }
});