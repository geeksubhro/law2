document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    fetch("https://4cf45b1e-0eaf-41e3-95e1-ce85f53c81c5.mock.pstmn.io/getlist")
        .then(response => response.text()) // Using .text() to get the raw response
        .then(text => {
            console.log("Raw response text:", text);
            // Manually correct the JSON format
            const correctedText = text.replace(/(\d+):/g, '"$1":'); // Add double quotes around keys
            console.log("Corrected response text:", correctedText);
            const data = JSON.parse(correctedText); // Parse the corrected JSON string
            console.log("Parsed data:", data);
            const itemList = document.getElementById("item-list");
            itemList.innerHTML = ''; // Clear any existing items
            for (const [key, value] of Object.entries(data)) {
                let listItem = document.createElement("li");
                listItem.textContent = value;
                listItem.classList.add("list-item");
                listItem.dataset.id = key;
                listItem.addEventListener("click", () => {
                    fetchChatMessages(key);
                });
                itemList.appendChild(listItem);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    function fetchChatMessages(id) {
        fetch(`https://4cf45b1e-0eaf-41e3-95e1-ce85f53c81c5.mock.pstmn.io/getlist/${id}`)
            .then(response => response.json())
            .then(messages => {
                console.log("Fetched messages:", messages);
                displayChatMessages(messages);
            })
            .catch(error => {
                console.error("Error fetching chat messages:", error);
            });
    }

    function displayChatMessages(messages) {
        const chatWindow = document.getElementById("chat-window");
        chatWindow.innerHTML = ''; // Clear existing messages
        messages.reverse().forEach(message => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message", message.sender);
            const textElement = document.createElement("div");
            textElement.classList.add("text");
            textElement.textContent = message.text;
            const iconElement = document.createElement("div");
            iconElement.classList.add("icon");
            iconElement.innerHTML = message.sender === "user" ? "&#128100;" : "&#128100;"; // Adjust icons as needed
            if (message.sender === "user") {
                messageElement.appendChild(textElement);
                messageElement.appendChild(iconElement);
            } else {
                messageElement.appendChild(iconElement);
                messageElement.appendChild(textElement);
            }
            chatWindow.appendChild(messageElement);
        });
    }
});
