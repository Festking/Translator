async function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    const direction = document.getElementById('languageDirection').value;
    const [source, target] = direction.split('-');

    if (!inputText) {
        document.getElementById('outputText').innerText = "Please enter some text.";
        return;
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${source}|${target}`);

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const translated = data.responseData.translatedText;
        document.getElementById('outputText').innerText = translated;
    } catch (error) {
        document.getElementById('outputText').innerText = "❌ Translation failed: " + error.message;
        console.error(error);
    }
}
