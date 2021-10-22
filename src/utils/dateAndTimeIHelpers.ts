export const getFormattedDate = new Date()
  .toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  .replace(/ /g, "/");
