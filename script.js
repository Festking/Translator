async function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    const direction = document.getElementById('languageDirection').value;
    const [source, target] = direction.split('-');
    const outputDiv = document.getElementById('outputText');

    if (!inputText) {
        outputDiv.innerText = "Please enter text to translate.";
        return;
    }

    outputDiv.innerText = "Translating...";

    try {
        const response = await fetch('https://translate.argosopentech.com/translate', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: inputText,
                source: source,
                target: target,
                format: "text"
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.translatedText) {
            outputDiv.innerText = data.translatedText;
        } else {
            outputDiv.innerText = "Translation failed. Please try again.";
        }
    } catch (error) {
        console.error("Translation Error:", error);
        outputDiv.innerText = "An error occurred. Check your connection or try again later.";
    }
}
