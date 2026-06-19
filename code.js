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
    KSA: "SA", // Saudi Arabia
    UK: "GB", // United Kingdom
    DE: "DE"  // Germany
};

async function validateRegion() {
    if (!region || !countryMap[region]) {
        return;
    }

    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const userCountry = data.country_code;
        const expectedCountry = countryMap[region];

        if (userCountry !== expectedCountry) {
            document.querySelector(".container").innerHTML = `
                <h1>Novara/Initara</h1>
                <p>I think you are wrong here :)</p>
            `;
        }
    } catch (err) {
        console.error("Location check failed:", err);

        // Optional: deny access if location lookup fails
        document.querySelector(".container").innerHTML = `
            <h1>Novara/Initara</h1>
            <p>I think you are wrong here :)</p>
        `;
    }
}

validateRegion();
