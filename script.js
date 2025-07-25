async function translateText() {
    const inputText = document.getElementById('inputText').value;
    const direction = document.getElementById('languageDirection').value;
    const [source, target] = direction.split('-');

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

    const data = await response.json();
    document.getElementById('outputText').innerText = data.translatedText;
}
