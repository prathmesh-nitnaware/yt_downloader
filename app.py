from flask import Flask, request, jsonify, send_from_directory
from downloader import download_video

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/download", methods=["POST"])
def download():
    data = request.get_json()
    url = data.get("url")
    if not url:
        return jsonify(success=False, error="No URL provided.")
    
    try:
        download_video(url)
        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=False, error=str(e))

if __name__ == "__main__":
    app.run(debug=True)
