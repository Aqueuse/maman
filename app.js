// récupération du stockage local
let messages = JSON.parse(localStorage.getItem("journal")) || [];

// DOM refs
const messagesDiv = document.getElementById("messages");
const speakerSelect = document.getElementById("speaker");
const textInput = document.getElementById("text");
const sendBtn = document.getElementById("send");
const imageInput = document.getElementById("imageInput");
const clearBtn = document.getElementById("clear");

let currentImageURL = null;

// affichage des messages
function render() {
    messagesDiv.innerHTML = "";

    messages.forEach(msg => {
        if (msg.image) {
            const el = document.createElement("div");
            const img = document.createElement("img");
            img.src = msg.image;
            img.classList.add("message-image");
            el.appendChild(img);
        }
        else {
            const el = document.createElement("div");
            el.classList.add("message", msg.speaker);
            el.textContent = msg.text;
            messagesDiv.appendChild(el);
        }
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addMessage() {
    const text = textInput.value.trim();
    if (!text && !currentImageURL) return;

    const speaker = speakerSelect.value;

    messages.push({
        speaker,
        text,
        image: currentImageURL || null
    });

    localStorage.setItem("journal", JSON.stringify(messages));

    // reset
    textInput.value = "";
    imageInput.value = "";
    currentImageURL = null;

    render();
}

// change l'ambiance selon le speaker sélectionné (moi ou maman)
function updateTheme() {
    document.body.className = speakerSelect.value;
}

// bouton
sendBtn.addEventListener("click", addMessage);

// enter pour envoyer
textInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addMessage();
    }
});

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) {
        currentImageURL = null;
        return;
    }

    currentImageURL = URL.createObjectURL(file);
});

speakerSelect.addEventListener("change", updateTheme);

clearBtn.addEventListener("click", () => {
    if (confirm("Effacer toute la conversation ?")) {
        messages = [];
        localStorage.setItem("journal", JSON.stringify(messages));
        render();
    }
});

// on applique l'ambiance au chargement
updateTheme();

// affichage initial
render();
