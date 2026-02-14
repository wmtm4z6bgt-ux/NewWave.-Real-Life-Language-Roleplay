const levels = [
    {
        characterName: "Oliver",
        image: "visitor_1.PNG", // Проверь расширение (.PNG или .png)
        dialogue: "Hi! Can I have a double espresso and a croissant, please?",
        correctAnswers: ["espresso", "croissant", "ok", "coming"],
        bg: "cafe_bg.PNG" 
    },
    {
        characterName: "Emma",
        image: "visitor_2.png", 
        dialogue: "Excuse me, do you have any dairy-free milk options?",
        correctAnswers: ["oat milk", "soy milk", "yes", "we have"],
        bg: "cafe_day.png"
    },
    {
        characterName: "Mr. Brown",
        image: "leopard_q.png", 
        dialogue: "I ordered a cold brew ten minutes ago. Where is it?",
        correctAnswers: ["sorry", "apologize", "minute", "check"],
        bg: "wave_bg.jpg"
    }
];

let currentLevelIndex = 0;

function loadLevel(index) {
    const level = levels[index];

    // 1. Имя и картинка (Исправлено: правильные обратные кавычки)
    document.getElementById('char-name').innerText = level.characterName;
    document.getElementById('character').src = `/static/${level.image}`;
    
    // 2. Фон (Исправлено: правильный синтаксис url)
    document.body.style.backgroundImage = `url('/static/${level.bg}')`;

    // 3. Очистка
    document.getElementById('user-input').value = '';
    const feedback = document.getElementById('feedback');
    if(feedback) feedback.innerText = '';

    // 4. Текст диалога
    if (typeof showText === "function") {
        showText(level.dialogue);
    } else {
        document.getElementById('dialogue-text').innerText = level.dialogue;
    }
} // <--- Обязательно закрываем функцию!

function checkAnswer() {
    const inputField = document.getElementById('user-input');
    if (!inputField) return;

    const input = inputField.value.toLowerCase();
    const currentLevel = levels[currentLevelIndex];
    const feedback = document.getElementById('feedback');

    const isCorrect = currentLevel.correctAnswers.some(keyword => input.includes(keyword));

    if (isCorrect) {
        feedback.innerText = "✅ Excellent! Moving to the next customer...";
        feedback.style.color = "green";

        setTimeout(() => {
            currentLevelIndex++;
            if (currentLevelIndex < levels.length) {
                loadLevel(currentLevelIndex);
            } else {
                showWinScreen();
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
        <div style="text-align: center; padding-top: 100px; background: rgba(255,255,255,0.8); height: 100vh;">
            <h1>🎉 MISSION ACCOMPLISHED!</h1>
            <p>You served all customers and improved your vocabulary.</p>
            <button onclick="location.reload()" style="padding: 10px 20px; cursor: pointer;">PLAY AGAIN</button>
        </div>
    `;
}

// Проверяем, есть ли на странице элементы игры, прежде чем запускать уровень
window.onload = () => {
    const charNameElement = document.getElementById('char-name');
    if (charNameElement) {
        loadLevel(0);
    }
};

function openModal() {
    const modal = document.getElementById("regModal");
    if (modal) {
        modal.style.display = "block";
    } else {
        console.error("Окно regModal не найдено!");
    }
}

function closeModal() {
    const modal = document.getElementById("regModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Закрытие кликом вне окна
window.addEventListener('click', function(event) {
    const modal = document.getElementById("regModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
});