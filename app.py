from flask import Flask, request, jsonify, send_from_directory, render_template
import pdfplumber
import json
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_pdf():
    if 'pdf_file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['pdf_file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            filename = secure_filename(file.filename)
            pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(pdf_path)

            json_filename = filename[:-4] + '.json'
            json_path = os.path.join(app.config['UPLOAD_FOLDER'], json_filename)

            with pdfplumber.open(pdf_path) as pdf:
                pages = pdf.pages
                text_data = []
                for page in pages:
                    page_text = page.extract_text()
                    text_data.append(page_text)

            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump({"pages": text_data}, f, indent=4)

            # Correctly construct the download link
            download_link = f"/download/{json_filename}"

            return jsonify({'message': 'PDF converted to JSON successfully', 'download_link': download_link}), 200

        except pdfplumber.exceptions.InvalidPDF as e:
            return jsonify({'error': 'Invalid or corrupted PDF file.'}), 400
        except Exception as e:
            return jsonify({'error': 'An error occurred during conversion.'}), 500

    else:
        return jsonify({'error': 'Invalid file type. Only PDFs are allowed.'}), 400

@app.route('/download/<filename>')
def download_file(filename):
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)