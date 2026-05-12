from flask import Flask, render_template, request, redirect, url_for, session
from flask_socketio import SocketIO, emit
import os
app = Flask(__name__)
app.secret_key = "AbdallahApp"
socketio = SocketIO(app, cors_allowed_origins="*")


chat_history = []
dataBase = []

@app.route("/")
def home():
  if "username" in session:
        return redirect(url_for("chat"))
  return render_template("index.html")

@app.route("/signIn", methods=["POST", "GET"])
def signIn():
    global dataBase
    error = None
    if request.method == "POST":
        name = request.form["name"].strip()
        password = request.form["password"].strip()
        user_found = False
        for user in dataBase:
            if user["name"] == name and user["password"] == password:
                user_found = True
                break
        if user_found:
            session["username"] = name
            return redirect(url_for("chat"))
        else:
            error = "اسم المستخدم أو كلمة المرور غير صحيحة، أو لم تقم بالتسجيل بعد!"

    return render_template("sign_in.html", error=error)



@app.route("/signUp", methods=["GET","POST"])
def signUp():
    global dataBase
    error = None
    if request.method == "POST":
        name = request.form["name"].strip()
        password = request.form["password"].strip()
        email = request.form["email"].strip()
        gender = request.form["gender"].strip()
        user_exists = False
        for user in dataBase:
            if user["name"] == name or user["email"] == email:
                user_exists = True
                break
        if user_exists:

            error = "الحساب موجود مسبقاً، حاول تسجيل الدخول أو استخدم بيانات مختلفة للتسجيل!"
        else:
            session["username"] = name
            dataBase.append({
                "name": name,
                "password": password,
                "email": email,
                "gender": gender
            })
            return redirect(url_for("chat"))
    return render_template("sign_up.html", error=error)



@app.route('/chat')
def chat():
  if "username" not in session:
    return redirect(url_for("home"))
  print(chat_history)
  return render_template('app.html', chat_history=chat_history)
@socketio.on("myMsg")
def msg(msg):
    username = session.get("username", "Unknown")
    chat_history.append({"text": msg, "username": username})
    emit("msg", {"text": msg, "username": username}, broadcast=True)

if __name__ == '__main__':
    port = int(os.environ.get("PORT",5000))
    socketio.run(app, host="0.0.0.0", port=port,debug=False)