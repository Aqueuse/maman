// récupération du stockage local
let messages = JSON.parse(localStorage.getItem("journal")) || [];

// DOM refs
const messagesDiv = document.getElementById("messages");
const speakerSelect = document.getElementById("speaker");
const textInput = document.getElementById("text");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");
const imageInput = document.getElementById("image-input-file-chooser");
const addImageButton = document.getElementById("add-image");
const previewImage = document.getElementById("preview-image");
const textArea = document.getElementById("text-area");

let currentImageURL = null;

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

//////////////////////////////
//////////   EVENTS  /////////
//////////////////////////////

sendBtn.addEventListener("click", () => {  // send message (by clicking button)
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
    currentImageURL = null;

    render();
});

textInput.addEventListener("keydown", e => { // send message (by pushing enter key)
    e.preventDefault();

    if (e.key === "Enter" && !e.shiftKey) {
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
    currentImageURL = null;

    render();
    }
});

speakerSelect.addEventListener("change", () => { // select beetween maman and moi
    document.body.className = speakerSelect.value;
    textArea.className = speakerSelect.value;
});

addImageButton.addEventListener("click", () => {
    imageInput.click();
});

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) {
        previewImage.src = "";
        return;
    }

    const url = URL.createObjectURL(file);
    previewImage.src = url;
    previewImage.style.display = "block";
});

clearBtn.addEventListener("click", () => { // clear the conversation
    if (confirm("Effacer toute la conversation ?")) {
        messages = [];
        localStorage.setItem("journal", JSON.stringify(messages));
        render();
    }
});

////////////////////////////////
//////////// INIT //////////////
////////////////////////////////

// affichage initial
render();
