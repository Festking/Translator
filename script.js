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

    // Custom Igbo-English phrase mapping
    const customIgboToEnglish = {
        "ututu oma": "Good morning",
        "ka chi fo": "Good night",
        "kedu": "How are you?",
        "kedu ka ime": "How are you?",
        "daalụ": "Thank you",
        "biko": "Please",
        "anyị ga-ahụ echi": "See you tomorrow",
        "nnọọ": "Welcome",
        "ọ dị mma": "It's okay",
        "ọ dịghị ihe": "Nothing",
        "lee anya": "Look",
        "kụọ ọnụ": "Be quiet",
        "hapụ ya": "Leave it",
        "anyị nwere ike ime ya": "We can do it",
        "chukwu gozie gi": "God bless you",
        "a na m ekele gi": "I thank you",
        "onye ka ị bụ": "Who are you?",
        "ị bụ onye Igbo?": "Are you Igbo?",
        "ị maara m?": "Do you know me?",
        "ọ bụ gị?": "Is it you?",
        "ihe a dị mma": "This is good",
        "ọ na-adị mma": "It is nice",
        "nwanne m": "My sibling",
        "nna m": "My father",
        "nne m": "My mother",
        "gaba": "go",
        "bia": "come"
    };

    const customEnglishToIgbo = {};
    for (const [igbo, english] of Object.entries(customIgboToEnglish)) {
        customEnglishToIgbo[english.toLowerCase()] = igbo;
    }

    // Try custom dictionary match first
    const lowerInput = inputText.toLowerCase();
    if (source === "ig" && customIgboToEnglish[lowerInput]) {
        outputDiv.innerText = customIgboToEnglish[lowerInput];
        return;
    } else if (source === "en" && customEnglishToIgbo[lowerInput]) {
        outputDiv.innerText = customEnglishToIgbo[lowerInput];
        return;
    }

    // Fallback: Use LibreTranslate API
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${source}|${target}`);


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
