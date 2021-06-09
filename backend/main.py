import sqlite3, uuid, json
from bottle import Bottle, run, request, response, HTTPResponse

app = Bottle()

# DB with SQLite
con = sqlite3.connect("users.db")
cur = con.cursor()

def init():
    createDB()

def createDB():
    sql_query = """
    CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36),
    nick VARCHAR(30),
    sessionid VARCHAR(30),
    PRIMARY KEY (id));"""
    cur.execute(sql_query)
    con.commit()

def insertUserToDB(nick,sessionid):
    cur.execute("INSERT INTO users (id,nick,sessionid) VALUES ('{person_id}', '{unick}', '{usessionid}') ".format(person_id=str(uuid.uuid4()), unick=nick, usessionid=sessionid))
    con.commit()

def queryToJSON(query):
    re = []
    for e in query:
        re.append({"id":e[0],"nick":e[1],"sessionid":e[-1]})
    return(json.dumps(re))

def getAllUsers():
    sql_query = """SELECT * FROM users"""
    cur.execute(sql_query)
    content=cur.fetchall()
    erg = {}
    for e in content:
        erg[e[0]]= {"nick":e[1],"sessionid":e[-1]}
    return json.dumps((erg))

def getUsersByQuery(query):
    cur.execute("SELECT * FROM users WHERE nick LIKE '%{}%'".format(query))
    content=cur.fetchall()

    return(queryToJSON(content))

@app.route('/api/call', method='GET')
def api_getAllUsers():
    try:
        function = request.query['function']
    except:
        return HTTPResponse(status=502, body="502: query incomplete")

    # get all users
    if ( function=="getallusers" ):
        response.headers['Content-Type'] = 'application/json'
        return getAllUsers()
    # add new user
    elif ( function == "createuser" ):
        try:
            response.headers['Content-Type'] = 'application/json'
            name = request.query['name']
            location = request.query['location']
        except:
            return HTTPResponse(status=502, body="502: query incomplete")
        insertUserToDB( name, location )
    # search query for users
    elif ( function == "search" ):
        response.headers['Content-Type'] = 'application/json'
        try:
            name = request.query['name']
        except:
            return HTTPResponse(status=502, body="query incomplete")
        return getUsersByQuery(name)
    else:
        return HTTPResponse(status=404, body="function not found")

init()

run(app, host='127.0.0.1', port=8800, quiet=False)
