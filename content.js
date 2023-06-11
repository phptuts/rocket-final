chrome.runtime.onMessage.addListener(async (message, sender, reply) => {
  console.log("message", message);
  reply("ok");
  const data = await chrome.storage.local.get(["options"]);
  const url = data?.options?.url;
  if (!url) {
    alert("url not set for blastoff!");
    return;
  }
  const img = document.createElement("img");
  img.src = url;
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.position = "absolute";
  img.style.zIndex = 1000;
  document.body.append(img);
  let x = 200;
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
});
