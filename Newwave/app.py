from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Твоя база данных сценариев (List/Read)
scenarios = [
    {"id": 1, "title": "Airport Check-in", "desc": "Practice English at the airport."},
    {"d": 2, "title": "In the Cafe", "desc": "Order coffee and snacks."}
]

@app.route('/')
def home():
    return render_template('index.html', scenarios=scenarios)

@app.route('/add', methods=['POST'])
def add():
    title = request.form.get('title')
    if title:
        scenarios.append({"id": len(scenarios)+1, "title": title, "desc": "New scenario"})
    return redirect('/')
@app.route('/game')
def game():
    return render_template('game.html') # Тот самый файл с игрой-кафе

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
   