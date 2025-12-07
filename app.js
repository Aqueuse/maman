// récupération du stockage local
let messages = JSON.parse(localStorage.getItem("journal")) || [];

// DOM refs
const messagesDiv = document.getElementById("messages");
const speakerSelect = document.getElementById("speaker");
const textInput = document.getElementById("text");
const sendBtn = document.getElementById("send");

// affichage des messages
function render() {
    messagesDiv.innerHTML = "";

    messages.forEach(msg => {
        const el = document.createElement("div");
        el.classList.add("message", msg.speaker);
        el.textContent = msg.text;
        messagesDiv.appendChild(el);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ajout d’un message
function addMessage() {
    const text = textInput.value.trim();
    if (!text) return;

    const speaker = speakerSelect.value;

    messages.push({ speaker, text });
    localStorage.setItem("journal", JSON.stringify(messages));

    textInput.value = "";
    render();
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

// affichage initial
render();
