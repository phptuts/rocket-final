const buttonEl = document.querySelector("button");

buttonEl.addEventListener("click", async () => {
  try {
    const [activeTab] = await chrome.tabs.query({
      lastFocusedWindow: true,
      active: true,
    });
    const replyMessage = await chrome.tabs.sendMessage(activeTab.id, {
      type: "blast_off",
    });
    console.log(replyMessage, "replyMessage");
  } catch (e) {
    console.log(e, "error");
  }
});
