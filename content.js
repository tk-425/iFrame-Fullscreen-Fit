// Create the full-screen button
const fullScreenBtn = document.createElement("button");
fullScreenBtn.innerText = "Full Screen";
fullScreenBtn.style.position = "fixed";
fullScreenBtn.style.bottom = "10px";
fullScreenBtn.style.right = "10px";
fullScreenBtn.style.zIndex = "9999";
fullScreenBtn.style.padding = "10px 20px";
fullScreenBtn.style.fontSize = "16px";
fullScreenBtn.style.backgroundColor = "#007bff";
fullScreenBtn.style.color = "#fff";
fullScreenBtn.style.border = "none";
fullScreenBtn.style.borderRadius = "5px";
fullScreenBtn.style.cursor = "pointer";

// Append the button to the page
document.body.appendChild(fullScreenBtn);

// Track full-screen state
let isFullScreen = false;

// Add event listener for the full-screen button
fullScreenBtn.addEventListener("click", () => {
  toggleFullScreen();
});

// Add event listener for the "Control + Command + C" shortcut
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.metaKey && event.key.toLowerCase() === "c") {
    toggleFullScreen();
  }

  // Exit full-screen with Escape key
  if (event.key === "Escape" && isFullScreen) {
    const container =
      document.querySelector("video") || document.querySelector("iframe");
    if (container) {
      exitFullScreen(container.parentElement || container);
    }
  }
});

// Function to toggle full-screen mode
function toggleFullScreen() {
  const video = document.querySelector("video");
  const iframe = document.querySelector("iframe");
  const element = video || iframe;

  if (!element) {
    alert("No video or iframe found on the page.");
    return;
  }

  const container = element.parentElement;
  if (!isFullScreen) {
    // Enter full-screen mode
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.zIndex = "9999";
    container.style.backgroundColor = "black"; // Optional for better visibility
    element.style.width = "100%";
    element.style.height = "100%";

    fullScreenBtn.style.opacity = "0"; // Hide the button
    fullScreenBtn.style.pointerEvents = "none";
    isFullScreen = true;
  } else {
    exitFullScreen(container);
  }
}

// Function to exit full-screen mode
function exitFullScreen(container) {
  container.style.position = "";
  container.style.top = "";
  container.style.left = "";
  container.style.width = "";
  container.style.height = "";
  container.style.zIndex = "";
  container.style.backgroundColor = ""; // Reset background color

  const element =
    container.querySelector("video") || container.querySelector("iframe");
  if (element) {
    element.style.width = "";
    element.style.height = "";
  }

  fullScreenBtn.style.opacity = "1"; // Show the button
  fullScreenBtn.style.pointerEvents = "auto";
  isFullScreen = false;
}
