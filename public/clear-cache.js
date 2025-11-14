/**
 * Cache Clearing Utility Script
 * 
 * Add this script to browser console or bookmarklet to force clear all caches
 * for the Robotic Resilience website.
 */

function showStatus(message, type = 'success') {
    const status = document.getElementById('status');
    const statusText = document.getElementById('statusText');
    statusText.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
}

async function clearAllCaches() {
    showStatus('Starting cache clearing process...', 'warning');
    try {
        let clearedItems = [];
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            if (cacheNames.length > 0) {
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                clearedItems.push(`${cacheNames.length} service worker caches`);
            }
        }
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            if (registrations.length > 0) {
                registrations.forEach(registration => registration.unregister());
                clearedItems.push(`${registrations.length} service workers`);
            }
        }
        localStorage.clear();
        sessionStorage.clear();
        clearedItems.push('local storage', 'session storage');
        if ('indexedDB' in window && indexedDB.databases) {
            const databases = await indexedDB.databases();
            if (databases.length > 0) {
                databases.forEach(db => indexedDB.deleteDatabase(db.name));
                clearedItems.push(`${databases.length} IndexedDB databases`);
            }
        }
        showStatus(`✅ Successfully cleared: ${clearedItems.join(', ')}. Reloading in 3 seconds...`, 'success');
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    } catch (error) {
        showStatus(`❌ Error clearing caches: ${error.message}`, 'warning');
        console.error('Cache clearing error:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('clearCacheBtn').addEventListener('click', clearAllCaches);
    document.getElementById('openMainSiteBtn').addEventListener('click', function() {
        window.open('/', '_blank');
    });
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auto') === 'true') {
        setTimeout(clearAllCaches, 1000);
    }
});