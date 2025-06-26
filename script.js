document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('questionText');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const buttonContainer = document.getElementById('buttonContainer');
    const recommendationContainer = document.getElementById('recommendationContainer');
    const recommendationText = document.getElementById('recommendationText');
    const restartButton = document.getElementById('restartButton');

    let need = false;
    let hasSimilar = false;
    let budgetOk = false;
    let useOften = false;
    let onSale = false;

    const questions = [
        { text: "Do you really need this product?", variable: 'need' },
        { text: "Do you already own a similar product?", variable: 'hasSimilar' },
        { text: "Is it within your budget?", variable: 'budgetOk' },
        { text: "Will you use it often?", variable: 'useOften' },
        { text: "Is it on sale?", variable: 'onSale' }
    ];

    let currentQuestionIndex = 0;

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionText.textContent = questions[currentQuestionIndex].text;
            yesButton.classList.remove('selected');
            noButton.classList.remove('selected');
            buttonContainer.style.display = 'flex';
            recommendationContainer.style.display = 'none';
            restartButton.style.display = 'none';
        } else {
            calculateRecommendation();
        }
    }

    function handleAnswer(isYes) {
        const current = questions[currentQuestionIndex];
        switch (current.variable) {
            case 'need': need = isYes; break;
            case 'hasSimilar': hasSimilar = isYes; break;
            case 'budgetOk': budgetOk = isYes; break;
            case 'useOften': useOften = isYes; break;
            case 'onSale': onSale = isYes; break;
        }

        if (isYes) {
            yesButton.classList.add('selected');
            noButton.classList.remove('selected');
        } else {
            noButton.classList.add('selected');
            yesButton.classList.remove('selected');
        }

        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 300);
    }

    function calculateRecommendation() {
        let recommendation = "Think a bit more before buying.";

        if (need && budgetOk && !hasSimilar) {
            recommendation = "You can buy it!";
        } else if (!need && hasSimilar) {
            recommendation = "No need, don’t buy it.";
        } else if (!budgetOk) {
            recommendation = "It exceeds your budget, don’t buy.";
        } else if (onSale && useOften) {
            recommendation = "You can consider buying it on sale.";
        }

        questionText.textContent = "Decision Time!";
        buttonContainer.style.display = 'none';
        recommendationText.textContent = recommendation;
        recommendationContainer.style.display = 'block';
        restartButton.style.display = 'block';
    }

    function restartApp() {
        currentQuestionIndex = 0;
        need = false;
        hasSimilar = false;
        budgetOk = false;
        useOften = false;
        onSale = false;
        displayQuestion();
    }

    yesButton.addEventListener('click', () => handleAnswer(true));
    noButton.addEventListener('click', () => handleAnswer(false));
    restartButton.addEventListener('click', restartApp);

    displayQuestion();
});
