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

@app.route('/api/test')
def test():
    return "Works"


@app.route('/')
def homepage():
    return (render_template('index.html'))

@app.route('/buyer_login')
def buyer_login():
    return (render_template('login_buyer.html'))

@app.route('/buyer_new')
def buyer_new():
    return (render_template('new_buyer.html'))

@app.route('/seller_login')
def seller_login():
    return (render_template('seller_login.html'))

@app.route('/buyer_dash')
def buyer_dash():
    if 'role' in session and session['role'] == 'buyer':
        return (render_template('buyer_dash.html'))
    else:
        return Response(status=403)

@app.route('/seller_dash')
def seller_dash():
    if 'role' in session and session['role'] == 'seller':
        return (render_template('seller_dash.html'))
    else:
        return Response(status=403)


@app.route('/api/new_buyer', methods=['POST'])
def new_buyer():
    inputData = request.json
    Buyer_Data = pymongo.collection.Collection(db, 'Buyer_Data')
    buyers = json.loads(dumps(Buyer_Data.find()))
    if(len(buyers) != 0):
        for i in buyers:
            if i['email'] == inputData['email']:
                return Response(status=401)
    Buyer_Data.insert_one({'email':inputData['email'],'password':inputData['password']});
    return Response(status=200)


@app.route('/api/new_seller', methods=['POST'])
def new_seller():
    inputData = request.json
    Seller_Data = pymongo.collection.Collection(db, 'Seller_Data')
    sellers = json.loads(dumps(Seller_Data.find()))
    if(len(sellers) != 0):
        for i in sellers:
            if i['email'] == inputData['email']:
                return Response(status=401)
    Seller_Data.insert_one({'email':inputData['email'],'password':inputData['password']});
    return Response(status=200)


@app.route('/api/login_buyer', methods=['POST'])
def login_buyer():
    inputData = request.json
    Buyer_Data = pymongo.collection.Collection(db, 'Buyer_Data')
    buyers = json.loads(dumps(Buyer_Data.find()))
    if(len(buyers) == 0):
        return Response(status=401)
    for i in buyers:
        if i['email'] == inputData['email']:
            if i['password'] == inputData['password']:
                session['role'] = 'buyer'
                session['email'] = i['email']
                return Response(status=200)
            else:
                return Response(status=403)
    return Response(status=401)


@app.route('/api/login_seller', methods=['POST'])
def login_seller():
    inputData = request.json
    Seller_Data = pymongo.collection.Collection(db, 'Seller_Data')
    sellers = json.loads(dumps(Seller_Data.find()))
    if(len(sellers) == 0):
        return Response(status=401)
    for i in sellers:
        if i['email'] == inputData['email']:
            if i['password'] == inputData['password']:
                session['role'] = 'seller'
                session['email'] = i['email']
                return Response(status=200)
            else:
                return Response(status=403)
    return Response(status=401)


@app.route('/api/add_new_product', methods=['POST'])
def add_new_product():
    inputData = request.json
    Product_Data = pymongo.collection.Collection(db, 'Product_Data')
    #Seller_Data = pymongo.collection.Collection(db, 'Seller_Data')
    #for i in json.loads(dumps(Seller_Data.find())):
    #    if i['email'] == inputData['email']:
    #        Product_Data.insert_one({'seller':inputData['email'],'name':inputData['name'],'price':inputData['price'],'description':inputData['description']})
    #        return Response(status=200)
    if 'role' in session and session['role'] == 'seller':
        Product_Data.insert_one({'seller':session['email'],'name':inputData['name'],'price':inputData['price'],'description':inputData['description']})
        return Response(status=200)
    return Response(status=403)


@app.route('/api/add_new_sale', methods=['POST'])
def add_new_sale():
    inputData = request.json
    Product_Data = pymongo.collection.Collection(db, 'Product_Data')
    Buyer_Data = pymongo.collection.Collection(db, 'Buyer_Data')
    for i in json.loads(dumps(Buyer_Data.find())):
        if i['email'] == inputData['email']:
            Sales_Data.insert_one({'product':inputData['product_id'],'buyer':inputData['email'],'date':inputData['date']})
            return Response(status=200)
    return Response(status=403)


@app.route('/api/get_all_products')
def get_products():
    Product_Data = pymongo.collection.Collection(db, 'Product_Data')
    data = json.loads(dumps(Product_Data.find()))
    data2 = {'count':len(data),'data':data}
    return data2
