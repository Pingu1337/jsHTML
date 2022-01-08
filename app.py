import flask
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import os
from dotenv import load_dotenv


load_dotenv()

MYSQL_USER= os.environ.get('MYSQL_USER')
MYSQL_PW= os.environ.get('MYSQL_PW')
MYSQL_DB= os.environ.get('MYSQL_DB')
MYSQL_HOST= os.environ.get('MYSQL_HOST')
APP_SECRET_KEY= os.environ.get('APP_SECRET_KEY')


app = flask.Flask(__name__)

app.secret_key = APP_SECRET_KEY

app.config['MYSQL_USER'] = MYSQL_USER
app.config['MYSQL_PASSWORD'] = MYSQL_PW
app.config['MYSQL_DB'] = MYSQL_DB
app.config['MYSQL_HOST'] = MYSQL_HOST
mysql = MySQL(app)


@app.route('/login', methods=['GET', 'POST'])
def login():
      # Check if "username" and "password" POST requests exist (user submitted form)
      msg=''
      if flask.request.method == 'POST' and 'username' in flask.request.form and 'password' in flask.request.form:
            # Create variables for easy access
            username = flask.request.form['username']
            password = flask.request.form['password']
            # Check if account exists using MySQL
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM Users WHERE Username = %s AND Password = %s', (username, password,))
            # Fetch one record and return result
            account = cursor.fetchone()
            # If account exists in accounts table in out database
            if account:
               # Create session data, we can access this data in other routes
               flask.session['loggedin'] = True
               flask.session['id'] = account['ID']
               flask.session['username'] = account['Username']
               # Redirect to home page
               return flask.redirect(flask.url_for('home'))
            else:
               # Account doesnt exist or username/password incorrect
               msg = 'Incorrect username/password!'
               #Show the login form with message (if any)
      return flask.render_template('loginform.html', msg=msg)

@app.route('/register')
def register():
   return flask.render_template('regover.html')

@app.route('/logout')
def logout():
   flask.session.pop('loggedin', None)
   flask.session.pop('id', None)
   flask.session.pop('username', None)
   # Redirect to login page
   return flask.redirect(flask.url_for('home'))


@app.route('/')
def home():
    # Check if user is loggedin
      if 'loggedin' in flask.session:
        # User is loggedin show them the home page
        return flask.render_template('home.html', username=flask.session['username'])

      #User is not loggedin redirect to login page
      return flask.render_template('index.html')

#background process happening without any refreshing
@app.route('/background_process_test')
def background_process_test():
    print ("Hello")
    return "nothing"

if __name__ == '__main__':
   app.run()