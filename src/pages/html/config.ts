export const configHtml = `
<h1>Nuclear Configuration</h1>
<fieldset>
  <legend>User Agent</legend>
  <div class="frdata"><p>Your main nation name, used to identify yourself to the NS servers.</p></div></br>
  <input type="text" id="user-agent" placeholder="Enter nation name..."></input>
</fieldset>
<fieldset>
  <legend>Puppet List</legend>
  <div class="frdata"><p>A newline-separated list of your puppets in the format "nation,password" or "nation" to use the default password below.</p></div></br>
  <textarea id="puppet-list" rows="10" cols="30"></textarea>
</fieldset></br>
<fieldset>
  <legend>Default Password</legend>
  <div class="frdata"><p>The password to use for puppets if one is not provided above.</p></div></br>
  <input type="password" id="default-password" placeholder="Enter password here..."></input>
</fieldset>
<button id="save-settings" class="button big primary">Save Settings</button>
`;