/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {

  function getDisabledFeatures() {
    let features = [];
    const checkboxes = document.querySelectorAll(".features [type=checkbox]");
    for (let item of checkboxes) {
      if (!item.checked) {
        features.push(item.getAttribute("data-features"));
      }
    }
    return features;
  }

  const disabledFeatures = getDisabledFeatures();
  browser.storage.local.set({
    disabledFeatures
  });
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  const checkboxes = document.querySelectorAll(".features [type=checkbox]");
  if (!restoredSettings.hasOwnProperty('disabledFeatures')) {
	// no settings
	return;
  }
  for (let item of checkboxes) {
    if (restoredSettings.disabledFeatures.indexOf(item.getAttribute("data-features")) != -1) {
      item.checked = false;
    } else {
      item.checked = true;
    }
  }
}

function onError(e) {
  console.error(e);
}

/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On clicking the save button, save the currently selected settings.
*/
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", storeSettings);