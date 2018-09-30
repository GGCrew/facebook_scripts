/*
  Hide Facebook ads for companies that (inexplicably) have your email address

  Instructions:
    Go to https://www.facebook.com/ads/preferences/
    Open your browser's Javascript console for that tab/window
      (Try pressing F12, then click the "console" tab.)
    Copy all this code
    Paste this code into the Javascript console command line
    (optional: hit 'OK' if you see a "pasted Javascript can be dangerous" warning alert)
    Sit back and watch

  What this script does:
    Clicks the "Hide" button for each advertiser in the "Advertisers you've interacted with" section

  What this script doesn't do:
    Hijack your Facebook account
    Actually remove your email address from anyone who already has it

  Why run this script:
    It's partially a "privacy thing."  It's primarily an "accuracy thing."
    Facebook uses info on your advertising preferences screen to display ads within Facebook.
    Sometimes Facebook ads are useful; most of the time they are not. (IMHO)
    By hiding unwanted/unwarranted advertisers who have your email address,
    you are making Facebook ads more relevant to you.
    Or, by hiding *all* advertisers, you are possibly obscuring some of your personal data
    by concealing some of your interests from Facebook.
    Regardless of reason, just looking at the list of advertisers with your email address
    can be an eye-opening experience.  From personal experience, I went from a handful of advertisers
    to a still-growing list by simply (regretfully) providing my email to my local tire repair shop.
    By sharing my data with their "approved partners," my list was quickly swollen with local car dealerships.
    And those dealerships shared my data with their "approved partners," even though
    I never approved that sharing.  At some point, it looks like a company in Colorado (1500km away)
    runs both a dealership and a real-estate company.  And now my list is choc-a-bloc with
    real-estate companies from across the US and Canada.
    I am not interested in a new or used car, nor do I plan on moving within the next decade.
    These advertisers are useless to me, and clutter Facebook with ads that irritate me.
    By removing all the "advertisers with your email" entries, I am making Facebook less irritating.

  Developer notes:
    Only uses pure Javascript.  No dependencies on React, JQuery, etc...
    Tested with:
      Mozilla Firefox 63
      Microsoft Edge 42
    Should also work on Chrome, Opera, and Chromium.
    I have less faith it will work with Safari.
    Does NOT work with MS Internet Explorer 11 and earlier.
*/


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function openInteractedAdvertisersSection(){
  var advertisersInteracted = document.getElementById('interacted');
  var advertisersExpandables = advertisersInteracted.querySelectorAll('[data-testid="ads_settings_expandable_profile"]');
  if(advertisersExpandables.length == 1){
    section = advertisersExpandables[0];
    if(section.children[2].className.split(' ').includes('hidden_elem')){
      section.click();
      await sleep(500);  // wait .5 seconds for section to appear
    }
  }
}


async function loadMoreInteractedAdvertisers(){
  var advertisersInteracted = document.getElementById('interacted');
  var moreLinks = advertisersInteracted.querySelectorAll('[shade="medium"]');
  if(moreLinks.length == 1){
    moreLinks[0].click();
    await sleep(2000);  // wait 2 seconds for new advertisers to finish loading
    loadMoreInteractedAdvertisers();
  }
}


async function hideInteractedAdvertisers(){
  var advertisersInteracted = document.getElementById('interacted');
  var buttons = advertisersInteracted.getElementsByTagName('button');
  var removedCounter = 0;
  for(var i = 0; i < buttons.length; i++){
    var content = buttons[i].getAttribute("data-tooltip-content");
    // This test is English-centric.  It will not work for other languages.
    // (For example: this text is "Keelhaul" if "English (Pirate)" is selected.)
    // Todo: make this test work for more languages
    if(content == "Remove"){
      buttons[i].scrollIntoView();
      buttons[i].click();
      removedCounter++;
      await sleep(200);  // wait .2 seconds to finish hiding current advertiser
    }
  }
  return removedCounter;
}


openInteractedAdvertisersSection();
loadMoreInteractedAdvertisers();
hideInteractedAdvertisers().then(val => alert("Script complete!\nHid " + val + " advertisers"));

