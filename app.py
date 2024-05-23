from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
# https://4cf45b1e-0eaf-41e3-95e1-ce85f53c81c5.mock.pstmn.io/getlist/1