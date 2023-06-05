const buttonEl = document.querySelector("button");
const inputEl = document.querySelector("input");

chrome.storage.local.get(["options"]).then((data) => {
  inputEl.value = data?.options?.url ?? "";
});

buttonEl.addEventListener("click", async () => {
  try {
    await chrome.storage.local.set({ options: { url: inputEl.value } });
  } catch (e) {
    alert(e.message);
  }
});
