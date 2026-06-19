function checkAnswer(correctAnswer, redirectUrl) {
    const input = document.getElementById("answer").value;
    const message = document.getElementById("message");

    if (input === correctAnswer) {
        window.location.href = redirectUrl;
    } else {
        message.textContent = "Wrong answer.";
    }
}

document.getElementById("submitBtn").addEventListener("click", () => {
    checkAnswer("⛄︎", "nil.html");
});
