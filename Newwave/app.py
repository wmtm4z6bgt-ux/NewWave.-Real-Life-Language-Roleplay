from flask import Flask, render_template, request, redirect, url_for # Добавили url_for

app = Flask(__name__)

# База данных сценариев 
scenarios = [
    {"id": 1, "title": "Airport Check-in", "desc": "Practice English at the airport."},
    {"id": 2, "title": "In the Cafe", "desc": "Order coffee and snacks."}
]

# Данные уровней 
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
        "character_text": "This coffee is cold! I have been waiting for 20 minutes!",
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
    level_data = levels.get(level_id, levels[1])
    return render_template('game.html', level=level_data, current_level=level_id)

@app.route('/game')
def game_redirect():
    return redirect(url_for('game', level_id=1))

@app.route('/add', methods=['POST'])
def add():
    title = request.form.get('title')
    if title:
        scenarios.append({"id": len(scenarios)+1, "title": title, "desc": "New scenario"})
    return redirect(url_for('home'))

@app.route('/register', methods=['POST'])
def register():
    # Проверяем, что импортирован requests в самом верху файла!
    import requests 
    
    name = request.form.get('username')
    email = request.form.get('email')

    # Ссылка
    form_url = "https://docs.google.com/forms/d/e/1FAIpQLSemUGGm7PHozVzhzBTAcVnBAnXVFWH1_NXGrXT_pWVBsoD_aQ/formResponse"

    # Твои ID полей из скриншотов
    payload = {
        "entry.724118615": name,
        "entry.500836566": email
    }

    try:
        # Отправляем данные в Google
        response = requests.post(form_url, data=payload)
        print(f"Статус отправки в Google: {response.status_code}")
    except Exception as e:
        print(f"Ошибка при отправке: {e}")

    # Сохраняем локально в файл
    with open("players.txt", "a", encoding="utf-8") as f:
        f.write(f"Name: {name}, Email: {email}\n")

    return redirect(url_for('game', level_id=1))



if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)