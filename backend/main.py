import sqlite3, uuid, json, os
from bottle import Bottle, run, request, response, HTTPResponse


from base64 import (
    b64encode,
    b64decode,
)

from Crypto.Hash import SHA256
from Crypto.Signature import pkcs1_15
from Crypto.PublicKey import RSA

app = Bottle()

# DB with SQLite
con = sqlite3.connect("users.db")
cur = con.cursor()

def init():

    def createDB():
        sql_query = """
        CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36),
        nick VARCHAR(30),
        sessionid VARCHAR(30),
        PRIMARY KEY (id));"""
        cur.execute(sql_query)
        con.commit()

    createDB()



# route for debugging
# get information about all users
@app.route('/api/call/getallusers')
@app.route('/api/call/getAllUsers')
def api_getAllUsers():

    def getAllUsers():
        sql_query = """SELECT * FROM users"""
        cur.execute(sql_query)
        content=cur.fetchall()
        erg = {}
        for e in content:
            erg[e[0]] = {"nick":e[1],"location":e[-1]}
        return json.dumps(erg)

    response.headers['Content-Type'] = 'application/json'
    return getAllUsers()


# route for user registration
# without public key - tbd
@app.route('/api/call/createuser')
@app.route('/api/call/createUser')
def api_insertUser():

    def insertUserToDB(id,nick,sessionid):
        cur.execute("INSERT INTO users (id,nick,sessionid) VALUES (?,?,?)", (id, nick, sessionid))
        con.commit()

    try:
        name = request.query['name']
        location = request.query['location']
    except:
        return HTTPResponse(status=502, body="502: query incomplete")
    response.headers['Content-Type'] = 'application/json'

    id = str(uuid.uuid4())
    insertUserToDB(id,name,location)

    return json.dumps({"id":id})

# route for search functionality
@app.route('/api/call/search')
def api_search():

    def queryToJSON(query):
        re = []
        for e in query:
            re.append({"id":e[0],"nick":e[1],"location":e[-1]})
        return(json.dumps(re))

    def getUsersByQuery(query):
        cur.execute("select * from users where nick = ?", [query])
        content=cur.fetchall()
        return(queryToJSON(content))

    try:
        name = request.query['name']
    except:
        return HTTPResponse(status=502, body="query incomplete")
    response.headers['Content-Type'] = 'application/json'
    return getUsersByQuery(name)

# route for upload user public key
@app.route('/api/call/uploadpubkey', method="POST")
def upPublicKey():
    key = request.files.get('FILE')
    ID = request.forms.get('ID')
    name, ext = os.path.splitext(key.filename)
    if ext not in ('.pem'):
        return HTTPResponse(status=502, body="wrong file extension")
    file_path = "keys/{file}".format(file=ID+".pem")
    key.save(file_path)

init()

run(app, host='127.0.0.1', port=8800, quiet=False)
