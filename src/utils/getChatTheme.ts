import Cookies from "js-cookie";

export const setChatTheme = (color: string) => {
  let chatTheme = "theme-orange";
  console.log(color);
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
  Cookies.set("theme", chatTheme);
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

export const getChatTheme = () =>
  Cookies.get("theme") === undefined ? "theme-orange" : Cookies.get("theme");
