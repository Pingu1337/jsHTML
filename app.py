from flask import Flask, jsonify, request, render_template
from flaskext.mysql import MySQL

app = Flask(__name__)

@app.route('/')
def home():
   with open("test.txt", "w") as fo:
      fo.write("This is Test Data")
   return render_template('index.html')

#background process happening without any refreshing
@app.route('/background_process_test')
def background_process_test():
    print ("Hello")
    return "nothing"

@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.form['javascript_data']
    print(jsdata)
    return jsdata

if __name__ == '__main__':
   app.run()