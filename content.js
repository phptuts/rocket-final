/*
Create a function that allows you send a blast off with 
an image url and start location.  Use setTimeout to fire the 
function multiple times at differnt x positions.
*/

chrome.runtime.onMessage.addListener(async (message, sender, reply) => {
  console.log("message", message);
  reply("ok");
  const data = await chrome.storage.local.get(["options"]);
  const url = data?.options?.url;
  if (!url) {
    alert("url not set for blastoff!");
    return;
  }
  fireImage(url, 200);
  setTimeout(() => {
    fireImage(url, 400);
  }, 400);
  setTimeout(() => {
    fireImage(url, 600);
  }, 500);
});

function fireImage(url, xPosition) {
  const img = document.createElement("img");
  img.src = url;
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.position = "absolute";
  img.style.zIndex = 1000;
  document.body.append(img);
  let x = xPosition;
  let y = window.screen.height;
  let intervalId = setInterval(() => {
    img.style.left = x + "px";
    img.style.top = y + "px";
    y -= 5;
    x += 2;
    if (y < -500) {
      clearInterval(intervalId);
      img.remove();
    }
  }, 5);
}
