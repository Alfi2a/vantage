function checkAnswer(correctAnswer, redirectUrl) {
    const answerEl = document.getElementById("answer");
    const message = document.getElementById("message");

    if (!answerEl) return;

    const input = answerEl.value;

    if (input === correctAnswer) {
        window.location.href = redirectUrl;
    } else if (message) {
        message.textContent = "Wrong answer.";
    }
}

// Safely attach button listener
const submitBtn = document.getElementById("submitBtn");

if (submitBtn) {
    submitBtn.addEventListener("click", () => {
        checkAnswer("⛄︎", "nil.html");
    });
}

// Atbash cipher
function atbash(str) {
    return str.replace(/[a-z]/gi, (char) => {
        const isUpper = char === char.toUpperCase();
        const code = char.toLowerCase().charCodeAt(0) - 97;
        const encoded = String.fromCharCode(97 + (25 - code));
        return isUpper ? encoded.toUpperCase() : encoded;
    });
}

// URL examples:
// ?id=KSA
// ?id=UK
// ?id=DE
const params = new URLSearchParams(window.location.search);
const region = params.get("id");

if (region) {
    console.log("ER:", atbash(region));
}

const countryMap = {
    KSA: "SA",
    UK: "GB",
    DE: "DE"
};

async function validateRegion() {
    try {
        console.log("...");

        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        console.log("API:", data);

        // Show encoded country
        const country = data.country_name;
        const encodedCountry = atbash(country);

        console.log("C:", encodedCountry);

        document.body.insertAdjacentHTML(
            "beforeend",
            `<p>C: ${encodedCountry}</p>`
        );

        // No region restriction
        if (!region || !countryMap[region]) {
            return;
        }

        const userCountry = data.country_code;
        const expectedCountry = countryMap[region];

        console.log("U:", userCountry);
        console.log("Ex:", expectedCountry);

        if (userCountry !== expectedCountry) {
            document.body.innerHTML = `
                <div style="
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                    font-family:sans-serif;
                    text-align:center;
                ">
                    <h1>???</h1>
                    <p>I think you are wrong here :)</p>
                </div>
            `;
        }
    } catch (err) {
        console.error("Location check failed:", err);

        document.body.innerHTML = `
            <div style="
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                height:100vh;
                font-family:sans-serif;
                text-align:center;
            ">
                <h1>???</h1>
                <p>I think you are wrong here :)</p>
            </div>
        `;
    }
}

validateRegion();
