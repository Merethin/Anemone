export const nukeStationHtml = `
<h1>Nuclear Control Station</h1>
<p id="puppet-status">0 Puppets Saved, 0 Alive / 0 Loaded (run Classify to load)</p>
<fieldset>
  <legend>Join Faction</legend>
  <div class="frdata"><p>Join a faction with all your puppets, leaving any previous faction they may be in.</p></div>
  <input type="text" id="mass-join-fid" placeholder="Enter Faction ID..."></input>
  <button id="mass-join-faction" class="button primary">Join Faction</button>
</fieldset>
<fieldset>
  <legend>Leave Faction</legend>
  <div class="frdata"><p>Leave from a faction with all your non-targeted puppets. Do this if logging off for the night.</p></div>
  <input type="text" id="mass-leave-fid" placeholder="Enter Faction ID..."></input>
  <button id="mass-leave-faction" class="button primary">Leave Faction</button>
</fieldset>
<fieldset>
  <legend>Classify Puppets</legend>
  <div class="frdata"><p>Fetch the specialization and stats of your nations.</p></div>
  <a class="button primary" href="/page=blank/nuke/classify">Classify Puppets</a>
</fieldset>
<fieldset>
  <legend>WA Nation</legend>
  <div class="frdata"><p>Your WA nation generates production 10x faster and has a higher cap.</p></div>
  <p id="wa-status">Current World Assembly nation: none</p>
  <b>Press W to find and update your WA</b>
</fieldset>
<fieldset>
  <legend>Convert Production</legend>
  <div class="frdata"><p>Select the nations to convert production on.</p></div>
  <input type="checkbox" id="prod-select-mil"></input> Military Specialists<br>
  <input type="checkbox" id="prod-select-strat"></input> Strategic Specialists<br>
  <input type="checkbox" id="prod-select-econ"></input> Economic Specialists<br>
  <input type="checkbox" id="prod-select-clean"></input> Cleanup Specialists<br>
  <button id="mass-produce-nukes" class="button primary">Generate Nukes</button><br>
  <button id="mass-produce-shields" class="button primary">Generate Shields</button>
</fieldset>
<fieldset>
  <legend>Donate Shields</legend>
  <div class="frdata"><p>Donate a certain percentage of your shields to the faction shield bank.</p></div>
  <p>Donate <input type="text" id="mass-donate-ratio" value="50" size="3"></input> % of each puppet's shields</p>
  <button id="mass-donate" class="button primary">Donate</button>
</fieldset>
<fieldset>
  <legend>Target Nukes</legend>
  <div class="frdata"><p>Target nukes at an enemy faction.</p></div>
  <input type="text" id="mass-target-fid" placeholder="Enter Faction ID..."></input>
  <p>Overkill: <input type="text" id="mass-target-overkill" value="1" size="3"></input> x</p>
  <button id="mass-target-faction" class="button primary">Target Faction</button>
</fieldset>
<fieldset>
  <legend>Cleanup Radiation</legend>
  <div class="frdata"><p>Bring destroyed nations back to life.</p></div>
  <input type="text" id="mass-clean-fid" placeholder="Enter Faction ID..."></input>
  <button id="mass-clean-faction" class="button primary">Cleanup Faction</button>
</fieldset>
<fieldset>
  <legend>Stat Tracking</legend>
  <p><span id="nuke-confirmed">0</span> Nukes</p>
  <p><span id="shield-confirmed">0</span> Shields</p>
  <p><span id="prod-confirmed">0</span> Production</p>
  <p><span id="destroyed-confirmed">0</span> Nations Destroyed</p>
  <br>
  <b>Military Specialists (<span id="mil-count">0</span>)</b>
  <p>Estimated Production: <span id="prod-mil-estimated">0</span></p>
  <p>Estimated Nukes to Produce: <span id="nuke-mil-estimated">0</span></p>
  <p>Estimated Shields to Produce: <span id="shield-mil-estimated">0</span></p>
  <br>
  <b>Strategic Specialists (<span id="strat-count">0</span>)</b>
  <p>Estimated Production: <span id="prod-strat-estimated">0</span></p>
  <p>Estimated Nukes to Produce: <span id="nuke-strat-estimated">0</span></p>
  <p>Estimated Shields to Produce: <span id="shield-strat-estimated">0</span></p>
  <br>
  <b>Economic Specialists (<span id="econ-count">0</span>)</b>
  <p>Estimated Production: <span id="prod-econ-estimated">0</span></p>
  <p>Estimated Nukes to Produce: <span id="nuke-econ-estimated">0</span></p>
  <p>Estimated Shields to Produce: <span id="shield-econ-estimated">0</span></p>
  <br>
  <b>Cleanup Specialists (<span id="clean-count">0</span>)</b>
  <p>Estimated Production: <span id="prod-clean-estimated">0</span></p>
  <p>Estimated Nukes to Produce: <span id="nuke-clean-estimated">0</span></p>
  <p>Estimated Shields to Produce: <span id="shield-clean-estimated">0</span></p>
  <p>Estimated Curable Nations: <span id="cure-clean-estimated">0</span></p>
</fieldset>`;