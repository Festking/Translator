async function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    const direction = document.getElementById('languageDirection').value;
    const [source, target] = direction.split('-');

    if (!inputText) {
        document.getElementById('outputText').innerText = "Please enter some text.";
        return;
    }

    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${source}|${target}`;

    try {
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

        if (!response.ok) throw new Error("Proxy server error");

        const dataWrapped = await response.json();
        const data = JSON.parse(dataWrapped.contents);
        const translated = data.responseData.translatedText;

        document.getElementById('outputText').innerText = translated;
    } catch (error) {
        document.getElementById('outputText').innerText = "❌ Translation failed: " + error.message;
        console.error(error);
    }
}
