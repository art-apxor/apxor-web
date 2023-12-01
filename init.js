console.log("Initializing Apxor");
let site_id = window.APX_SITE_ID;
if(!site_id){
console.log("Can not find site id. Using the default id");
  site_id = "b0bf1fc7-b104-4e92-9cc5-590fcb685c29"
}
window.Apxor?.init(
    site_id,
    {
      debug: true,
      idle_time_out: 600,
      plugins: ["ApxorRTM"],
      version: 144,
      events_upload_time: 5,
      retry_time: 5,
      bulk_upload: true,
      ed_t_time: 90,
      level: "debug",
    },
    function success(data) {
      console.log("SDK Initialized: " + data.client_id);
    },
    function error() {
      console.log("SDK is not initialized.");
    }
);

// Function to log events
function logEvent(eventType) {
  window.Apxor?.logEvent(eventType);
}

// Event listeners for button clicks, page loads, navigations, and page unloads
document.addEventListener('DOMContentLoaded', function() {
  // Page load event
  logEvent('apx_page_loaded');
});

window.addEventListener('beforeunload', function() {
  // Page unload event
  logEvent('apx_page_beforeload');
});

window.addEventListener('unload', function() {
  // Page unload event (alternative)
  logEvent('apx_page_unload');
});

window.addEventListener('click', function(event) {
  // Button click event
  if (event.target.tagName === 'BUTTON') {
    let buttonName = event.target.innerText;
    if(!buttonName){
      buttonName = "btn";
    }
    logEvent(`apx_${buttonName}_clicked`);
  }
});

window.addEventListener('popstate', function() {
  // Navigation event (back/forward button)
  logEvent('apx_navigation');
});
