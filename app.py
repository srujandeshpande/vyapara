import pymongo
from bson.json_util import dumps
import json
from flask import Flask, request, render_template, session, redirect, url_for, flash, Response, abort, render_template_string, send_from_directory
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = b'\xd2(*K\xa0\xa8\x13]g\x1e9\x88\x10\xb0\xe0\xcc'

#Loads the Database and Collections
mongo = pymongo.MongoClient('mongodb+srv://admin:admin@cluster0-dlnod.gcp.mongodb.net/test?retryWrites=true&w=majority', maxPoolSize=50, connect=True)
db = pymongo.database.Database(mongo, 'vyapara')

@app.route('/')
def test():
    return "Works"

@app.route('/api/add_product', methods=['POST'])
def add_product():
    inputData = request.form
    Product_Data = pymongo.collection.Collection(db, 'Product_Data')
    Seller_Data = pymongo.collection.Collection(db, 'Seller_Data')
    for i in json.loads(dumps(Seller_Data.find())):
        if i['phone_number'] == inputData['phone_number'] and i['password'] == inputData['password']:
            if(i['ema_role'] == ""):
                flash("Invalid input")
                return redirect(url_for('ema_loginscreen'))
            else:
                session['phone_number'] = inputData['phone_number']
                session['ema_role'] = i['ema_role']
                return redirect(url_for('ema_dashboard'))
    flash("Please enter valid credentials")
    return redirect(url_for('ema_loginscreen'))


@app.route('/tests/build_test')
def build_test():
	return "Passed"


#Create Userpage
@app.route('/user/<phone_number>')
def user_page(phone_number):
	return render_template('user_page.html')
