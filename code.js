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

function atbash(str) {
    return str.replace(/[a-z]/gi, (char) => {
        const base = char <= 'Z' ? 65 : 97;
        const code = char.charCodeAt(0) - base;
        return String.fromCharCode(base + (25 - code));
    });
}

// URL examples:
// ?id=KSA
// ?id=UK
// ?id=DE

const params = new URLSearchParams(window.location.search);
const region = params.get("id");

if (region) {
    const encoded = atbash(region);
    console.log("Encoded region:", encoded);
}

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

        // Optional: deny access if location lookup fails
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
