/**
 * Cache Clearing Utility Script
 * 
 * Add this script to browser console or bookmarklet to force clear all caches
 * for the Robotic Resilience website.
 */

(function clearAllCaches() {
  console.log('🔄 Starting comprehensive cache clearing...');
  
  // 1. Clear Service Worker caches
  if ('serviceWorker' in navigator && 'caches' in window) {
    caches.keys().then(function(cacheNames) {
      console.log('📦 Found caches:', cacheNames);
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('🗑️ Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      console.log('✅ All service worker caches cleared');
    });
  }
  
  // 2. Unregister service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        console.log('🔌 Unregistering service worker');
        registration.unregister();
      }
    });
  }
  
  // 3. Clear browser storage
  try {
    localStorage.clear();
    sessionStorage.clear();
    console.log('🧹 Local and session storage cleared');
  } catch (e) {
    console.log('⚠️ Could not clear storage:', e);
  }
  
  // 4. Clear IndexedDB (if any)
  if ('indexedDB' in window) {
    try {
      indexedDB.databases().then(databases => {
        databases.forEach(db => {
          console.log('🗄️ Deleting IndexedDB:', db.name);
          indexedDB.deleteDatabase(db.name);
        });
      });
    } catch (e) {
      console.log('⚠️ Could not clear IndexedDB:', e);
    }
  }
  
  // 5. Force hard reload
  console.log('🔄 Forcing page reload...');
  setTimeout(() => {
    window.location.reload(true);
  }, 1000);
  
  console.log('✨ Cache clearing initiated. Page will reload in 1 second.');
})();

// Bookmarklet version (copy this entire line as a bookmark URL):
// javascript:(function(){if('serviceWorker'in navigator&&'caches'in window){caches.keys().then(function(cacheNames){return Promise.all(cacheNames.map(function(cacheName){return caches.delete(cacheName)}))}).then(function(){console.log('Caches cleared')})}if('serviceWorker'in navigator){navigator.serviceWorker.getRegistrations().then(function(registrations){for(let registration of registrations){registration.unregister()}})}try{localStorage.clear();sessionStorage.clear()}catch(e){console.log('Storage error:',e)}setTimeout(()=>{window.location.reload(true)},500)})();