@app.route("/download", methods=["POST"])
def download():
    data = request.get_json()
    url = data.get("url")
    if not url:
        return jsonify(success=False, error="No URL provided.")
    
    try:
        filename = download_video(url)  # get filename from download function
        return send_from_directory('.', filename, as_attachment=True)
    except Exception as e:
        return jsonify(success=False, error=str(e))
