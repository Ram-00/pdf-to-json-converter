# PDF to JSON Converter

This project provides a web-based tool to convert PDF files into JSON format.  It leverages the pdfplumber library for PDF processing and Flask for the backend web framework.

## Features

*   Converts PDF files to JSON.
*   User-friendly web interface.
*   Client-side file validation (PDF format, file size limit).
*   Displays success/error messages.
*   Download link for the converted JSON file.

## Technologies Used

*   **Backend:** Python, Flask, pdfplumber
*   **Frontend:** HTML, CSS, JavaScript

## Installation (for development)

1.  Clone the repository: `git clone https://github.com/Ram-00/pdf-to-json-converter.git`
2.  Create a virtual environment: `python3 -m venv venv` (or `python -m venv venv` depending on your setup)
3.  Activate the virtual environment: `source venv/bin/activate` (Linux/macOS) or `venv\Scripts\activate` (Windows)
4.  Install dependencies: `pip install -r requirements.txt` (create `requirements.txt` with `pip freeze > requirements.txt`)

## Usage (for development)

1.  Run the Flask app: `python app.py`
2.  Open your browser and go to `http://127.0.0.1:5000` (or the address shown in the terminal).

## Deployment

This application is best deployed using a platform that supports Python web apps, such as PythonAnywhere.  See the PythonAnywhere documentation for deployment instructions.

## GitHub Pages (Frontend only)

The frontend of this application can be deployed on GitHub Pages.  However, the backend requires a separate server environment.

## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.
