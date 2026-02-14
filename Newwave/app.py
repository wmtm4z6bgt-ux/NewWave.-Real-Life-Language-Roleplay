from flask import Flask, render_template, request, redirect, url_for # Добавили url_for

app = Flask(__name__)

# База данных сценариев (исправили "id")
scenarios = [
    {"id": 1, "title": "Airport Check-in", "desc": "Practice English at the airport."},
    {"id": 2, "title": "In the Cafe", "desc": "Order coffee and snacks."}
]

# Данные уровней (добавили character_name для красоты)
levels = {
    1: {
        "title": "Level 1: Simple Order",
        "character_name": "Oliver",
        "character_text": "Hello! I would like a peppermint tea, please.",
        "options": [
            {"text": "Sure! One peppermint tea coming up.", "is_correct": True},
            {"text": "No, we only have coffee.", "is_correct": False}
        ]
    },
    2: {
        "title": "Level 2: Complex Order",
        "character_name": "Emma",
        "character_text": "Hi! Can I have a large soy latte with extra caramel, no foam?",
        "options": [
            {"text": "Large soy latte, extra caramel, no foam. Got it!", "is_correct": True},
            {"text": "One small black coffee, please.", "is_correct": False}
        ]
    },
    3: {
        "title": "Level 3: Angry Customer",
        "character_name": "Mr. Brown",
        "character_text": "This coffee is cold! I've been waiting for 20 minutes!",
        "options": [
            {"text": "I'm so sorry! Let me make you a fresh one right now.", "is_correct": True},
            {"text": "It's not my fault, we are very busy today.", "is_correct": False}
        ]
    }
}

@app.route('/')
def home():
    return render_template('index.html', scenarios=scenarios)

@app.route('/game/<int:level_id>')
def game(level_id):
    # Берем данные уровня, если ID нет в списке — отдаем 1 уровень
    level_data = levels.get(level_id, levels[1])
    return render_template('game.html', level=level_data, current_level=level_id)

@app.route('/game')
def game_redirect():
    # Если кто-то просто зашел на /game, кидаем на 1 уровень
    return redirect(url_for('game', level_id=1))

@app.route('/add', methods=['POST'])
def add():
    title = request.form.get('title')
    if title:
        scenarios.append({"id": len(scenarios)+1, "title": title, "desc": "New scenario"})
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)