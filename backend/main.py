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

@app.route('/<:re:.*>', method='OPTIONS')
def enable_cors_generic_route():
    """
    This route takes priority over all others. So any request with an OPTIONS
    method will be handled by this function.

    See: https://github.com/bottlepy/bottle/issues/402

    NOTE: This means we won't 404 any invalid path that is an OPTIONS request.
    """
    add_cors_headers()

@app.hook('after_request')
def enable_cors_after_request_hook():
    """
    This executes after every route. We use it to attach CORS headers when
    applicable.
    """
    add_cors_headers()

def add_cors_headers():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = \
        'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = \
        'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


# DB with SQLite
con = sqlite3.connect("users.db")
cur = con.cursor()

def init():

    def createDB():
        cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36),
        username VARCHAR(30) unique,
        location VARCHAR(30),
        PRIMARY KEY (id));""")
        con.commit()
        cur.execute("""
        CREATE TABLE IF NOT EXISTS friendReq (
        friendA VARCHAR(36),
        friendB VARCHAR(36),
        accept BIT DEFAULT 0);""")
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
            erg[e[0]] = {"username":e[1],"location":e[-1]}
        return json.dumps(erg)

    response.headers['Content-Type'] = 'application/json'
    return getAllUsers()


# route for user registration
# without public key - tbd
@app.route('/api/call/createuser', method="POST")
@app.route('/api/call/createUser', method="POST")
def api_insertUser():
    def insertUserToDB(id,username,location):
        cur.execute("INSERT INTO users (id,username,location) VALUES (?,?,?)", (id, username, location))
        con.commit()
    try:
        name = request.query['USERNAME']
        location = request.query['LOCATION']
    except:
        return HTTPResponse(status=502, body="502: query incomplete, username and location is necessary")
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
            re.append({"id":e[0],"username":e[1],"location":e[-1]})
        return(json.dumps(re))

    def getUsersByQuery(query):
        cur.execute("select * from users where username = ?", [query])
        content=cur.fetchall()
        return(queryToJSON(content))

    try:
        name = request.query['USERNAME']
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

# route for update user location
@app.route('/api/call/uplocation', method="POST")
def upLocation():
    location = request.query['LOCATION']
    id = request.query['ID']
    cur.execute("update users set location = ? where id = ?", (location, id))

# route to get a peerjsid by given userid
@app.route('/api/call/getLocation', method="GET")
@app.route('/api/call/getlocation', method="GET")
def getLocation():

    response.headers['Content-Type'] = 'application/json'

    def queryToJSON(query):
        re = []
        for e in query:
            re.append({"LOCATION":e[0]})
        return(json.dumps(re))

    cur.execute("select location from users where id = ?", [getfrom])
    content=cur.fetchall()
    return(queryToJSON(content))

@app.route('/api/call/friendreq', method="POST")
@app.route('/api/call/friendReq', method="POST")
def friendReq():
    friendA = request.query['FROM']
    friendB = request.query['TO']
    cur.execute("INSERT INTO friendReq (friendA,friendb, accept) VALUES (?,?,0)", (friendA, friendB))
    con.commit()


@app.route('/api/call/getfriendreq', method="GET")
@app.route('/api/call/getFriendReq', method="GET")
def getfriendReq():
    def queryToJSON(query):
        re = []
        for e in query:
            re.append({"from":e[0], "username":e[1]})
        return(json.dumps(re))
    id = request.query['ID']
    cur.execute("select friendA, users.username from friendReq inner join users on users.id = friendA where friendB = ? and accept = 0", [id])
    content=cur.fetchall()
    response.headers['Content-Type'] = 'application/json'
    return(queryToJSON(content))

@app.route('/api/call/acceptFriend', method="GET")
@app.route('/api/call/acceptfriend', method="GET")
def acceptFriend():
    id = request.query['ID']
    friend = request.query['FRIEND']
    cur.execute("update friendReq set accept = 1 where friendB = ? and friendA= ?", (id, friend))
    cur.execute("INSERT INTO friendReq (friendA,friendb, accept) VALUES (?,?,1)", (id, friend))
    con.commit()

init()

run(app, host='0.0.0.0', port=8800, quiet=False)
