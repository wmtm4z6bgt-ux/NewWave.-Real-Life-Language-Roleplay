const levels = [
    {
        characterName: "Oliver",
        image: "visitor_1.png",
        dialogue: "Hi! Can I have a double espresso and a croissant, please?",
        correctAnswers: ["espresso", "croissant", "ok", "coming"],
        bg: "cafe_day.png"
    },
    {
        characterName: "Emma",
        image: "visitor_2.png",
        dialogue: "Excuse me, do you have any dairy-free milk options?",
        correctAnswers: ["oat milk", "soy milk", "yes", "we have"],
        bg: "cafe_busy.png"
    },
    {
        characterName: "Mr. Brown",
        image: "visitor_3.png",
        dialogue: "I ordered a cold brew ten minutes ago. Where is it?",
        correctAnswers: ["sorry", "apologize", "minute", "check"],
        bg: "cafe_evening.png"
    }
];

let currentLevelIndex = 0; // Начинаем с первого уровня
function loadLevel(index) {
    const level = levels[index];

    // 1. Меняем имя и картинку персонажа
    document.getElementById('char-name').innerText = level.characterName;
    document.getElementById('character').src = /static/$;level.image};
    
    // 2. Меняем фон (если нужно)
    document.getElementById('scene').style.backgroundImage = url('/static/${level.bg}');

    // 3. Очищаем ввод и фидбек
    document.getElementById('user-input').value = '';
    document.getElementById('feedback').innerText = '';

    // 4. Отрисовываем кликабельный текст (используем твою функцию showText)
    showText(level.dialogue);
function checkAnswer() {
    const input = document.getElementById('user-input').value.toLowerCase();
    const currentLevel = levels[currentLevelIndex];
    const feedback = document.getElementById('feedback');

    // Проверяем, есть ли ключевое слово в ответе
    const isCorrect = currentLevel.correctAnswers.some(keyword => input.includes(keyword));

    if (isCorrect) {
        feedback.innerText = "✅ Excellent! Moving to the next customer...";
        feedback.style.color = "green";

        // Задержка 2 секунды перед следующим уровнем
        setTimeout(() => {
            currentLevelIndex++; // Увеличиваем индекс
            
            if (currentLevelIndex < levels.length) {
                loadLevel(currentLevelIndex);
            } else {
                showWinScreen(); // Конец игры
            }
        }, 2000);
        
    } else {
        feedback.innerText = "❌ They didn't understand you. Try again!";
        feedback.style.color = "red";
    }
}
function showWinScreen() {
    const main = document.querySelector('.game-main');
    main.innerHTML = `
        <div style="text-align: center; padding-top: 100px;">
            <h1>🎉 MISSION ACCOMPLISHED!</h1>
            <p>You served all customers and improved your vocabulary.</p>
            <button onclick="location.reload()" class="btn-check">PLAY AGAIN</button>
        </div>
    `;
}
