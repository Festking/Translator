async function translateText() {
    const inputText = document.getElementById('inputText').value;
    const direction = document.getElementById('languageDirection').value;
    const [source, target] = direction.split('-');

    try {
        const response = await fetch('https://translate.argosopentech.com/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: inputText,
                source: source,
                target: target,
                format: "text"
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        document.getElementById('outputText').innerText = data.translatedText;
    } catch (error) {
        document.getElementById('outputText').innerText = "❌ Failed to translate: " + error.message;
        console.error(error);
    }
}
