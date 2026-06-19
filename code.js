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

// URL examples:
// ?id=KSA
// ?id=UK
// ?id=DE

const params = new URLSearchParams(window.location.search);
const region = params.get("id");

const countryMap = {
    KSA: "SA",
    UK: "GB",
    DE: "DE"
};

async function validateRegion() {
    if (!region || !countryMap[region]) return;

    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const userCountry = data.country_code;
        const expectedCountry = countryMap[region];

        if (userCountry !== expectedCountry) {
            const input = document.getElementById("answer");

            input.value = "";
            input.placeholder = "I think you are wrong here :)";
            input.disabled = true;
        }
    } catch (err) {
        console.error("Location check failed:", err);
    }
}

validateRegion();
