let chatTheme = "theme-orange";

export const setChatTheme = (color: string) => {
  // chatTheme = color;
  if (color === "#ee5522") {
    chatTheme = "theme-orange";
  }
  if (color === "#1597e5") {
    chatTheme = "theme-blue";
  }
  if (color === "#1c7947") {
    chatTheme = "theme-green";
  }
  if (color === "#1a1b1a") {
    chatTheme = "theme-dark";
  }
  document
    .getElementById("playground")
    ?.classList.remove(
      "theme-dark",
      "theme-orange",
      "theme-blue",
      "theme-green"
    )!;
  document.getElementById("playground")?.classList.add(chatTheme)!;
};

export const getChatTheme = () => chatTheme;
