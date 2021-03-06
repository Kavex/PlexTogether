'use strict';

const {
  ipcRenderer
} = require('electron');
var remote = require('electron').remote;
var path = require('path');

var modifierCheckboxes = document.querySelectorAll('.global-shortcut');
var closeEl = document.querySelector('.close');

closeEl.addEventListener('click', function(e) {
  ipcRenderer.send('close-about-window');
});

for (var i = 0; i < modifierCheckboxes.length; i++) {
  var shortcutKeys = configuration.readSettings('shortcutKeys');
  var modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;
  modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;

  modifierCheckboxes[i].addEventListener('click', function(e) {
    bindModifierCheckboxes(e);
  });
}

function bindModifierCheckboxes(e) {
  var shortcutKeys = configuration.readSettings('shortcutKeys');
  var modifierKey = e.target.attributes['data-modifier-key'].value;

  if (shortcutKeys.indexOf(modifierKey) !== -1) {
    var shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
    shortcutKeys.splice(shortcutKeyIndex, 1);
  } else {
    shortcutKeys.push(modifierKey);
  }

  configuration.saveSettings('shortcutKeys', shortcutKeys);
  ipcRenderer.send('set-global-shortcuts');
}
const {
  shell
} = require('electron')

function openPaypal() {
  shell.openExternal('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TKAR59DZ4HPWC&lc=AU&item_name=Plex%20Together&currency_code=AUD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted')
}