import sqlite3, uuid, json
from bottle import Bottle, run, request, response

app = Bottle()

# DB mit SQLite
con = sqlite3.connect("users.db")
cur = con.cursor()

def init():
    createDB()

def createDB():
    sql_query = """
    CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36),
    nick VARCHAR(30),
    sessionid VARCHAR(30)
    );"""
    cur.execute(sql_query)
    con.commit()

def insertUserToDB(nick,sessionid):
    sql_query = """
    INSERT INTO users (id,nick,sessionid)
    VALUES ('"""+str(uuid.uuid4())+"','"+nick+"','"+sessionid+"""');"""
    cur.execute(sql_query)
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

def getUsersbyQuery(query):
    #q = query.split(" ")
    sql_query = """
    SELECT * FROM users
    WHERE nick LIKE '%"""+query+"""%'"""
    #if(len(q)>1):
    #    sql_query = sql_query + """AND surname LIKE '%"""+q[1]+"""%'"""
    cur.execute(sql_query)
    content=cur.fetchall()

    return(queryToJSON(content))

#init()

#insertUserToDB("imke warnecke", "asg34g3q")
#insertUserToDB("jan hasselbacg", "298ag4gaw0")
#insertUserToDB("jan warnecke", "298fhosf0")


@app.route('/api/call', method='GET')
def api_getAllUsers():

    try:
        function = request.query['function']
    except:
        return "Query unvollständig."

    # Alle Nutzer aus DB abfragen.
    if ( function=="getallusers" ):
        response.headers['Content-Type'] = 'application/json'
        return getAllUsers()
    # Einen neuen Nutzer hinzufügen.
    elif ( function == "createuser" ):
        response.headers['Content-Type'] = 'application/json'
        try:
            name = request.query['name']
            location = request.query['location']
        except:
            return "Error 502."
        insertUserToDB( name, location )
    # Suchabfrage nach Nutzern.
    elif ( function == "search" ):
        response.headers['Content-Type'] = 'application/json'
        try:
            name = request.query['name']
        except:
            return "Error 502."
        return getUsersbyQuery(name)



    else:
        return "Error 404: Function not found."

run(app, host='127.0.0.1', port=8800, quiet=False)
