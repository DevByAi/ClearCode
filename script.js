function clearText() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
  }
  
  function processText(option) {
    const input = document.getElementById("inputText").value.trim(); 
    let result;
  
    const lines = input.split("\n").filter(line => line.trim() !== ""); 
  
    if (option === "spaces") {
      result = lines.join("\n");
    } else if (option === "comments") {
      result = lines.filter(line => !line.trim().startsWith("//")).join("\n");
    } else {
      result = lines.filter(line => !line.trim().startsWith("//")).join("\n");
    }
  
    document.getElementById("outputText").value = result;
    addToHistory(input, result, option);
  }
  
  function copyToClipboard() {
    const output = document.getElementById("outputText").value;
    navigator.clipboard.writeText(output).then(() => {
      alert("הטקסט הועתק ללוח!");
    });
  }
  
  function loadHistory() {
    const historyList = document.getElementById("historyList");
    const history = JSON.parse(localStorage.getItem("textHistory")) || [];
    historyList.innerHTML = "";
    history.forEach(({ input, result, option, timestamp }, index) => {
      const li = document.createElement("li");
      li.className = "history-item";


      const lines = input.split("\n");
      const shortText = lines.slice(0, 5).join("\n");
      const isTruncated = lines.length > 5;
  
      li.innerHTML = `
        <div class="history-text">${isTruncated ? shortText : input}</div>
        <button class="show-more-button" onclick="toggleFullText(${index})" style="display: ${
        isTruncated ? "block" : "none"
      };">הצג עוד</button>
        <div class="history-timestamp">${timestamp}</div>
      `;
  
      li.setAttribute("data-full-input", input);
      li.setAttribute("data-full-result", result);
      li.setAttribute("data-option", option);
      li.setAttribute("data-index", index);
  
      li.addEventListener("click", (event) => {
        if (!event.target.classList.contains("show-more-button")) {
          document.getElementById("inputText").value = input;
          document.getElementById("outputText").value = result;
        }
      });
  
      historyList.appendChild(li);
    });
  }
  
  function toggleFullText(index) {
    const historyList = document.getElementById("historyList");
    const li = historyList.querySelector(`.history-item[data-index="${index}"]`);
    const fullInput = li.getAttribute("data-full-input");
    const textDiv = li.querySelector(".history-text");
    const button = li.querySelector(".show-more-button");
  
    if (button.innerText === "הצג עוד") {
      textDiv.innerText = fullInput;
      button.innerText = "הצג פחות";
    } else {
      const lines = fullInput.split("\n");
      const shortText = lines.slice(0, 5).join("\n");
      textDiv.innerText = shortText;
      button.innerText = "הצג עוד";
    }
  }
  
  function addToHistory(input, result, option) {
    const timestamp = new Date().toLocaleString();
    const history = JSON.parse(localStorage.getItem("textHistory")) || [];
    history.push({ input, result, option, timestamp });
    localStorage.setItem("textHistory", JSON.stringify(history));
    loadHistory();
  }
  function toggleHistory() {
    const sidebar = document.getElementById("historySidebar");
    sidebar.classList.toggle("open");
    loadHistory(); 
  }
  loadHistory();
