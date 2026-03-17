/**
 * HTML Includes Loader
 * Fetches HTML partials and injects them into elements with [data-include] attributes.
 * After all sections are loaded, it dynamically loads main.js so DOM queries work correctly.
 */
(async function loadIncludes() {
    const elements = document.querySelectorAll('[data-include]');
    
    const fetches = Array.from(elements).map(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status}`);
            const html = await response.text();
            el.innerHTML = html;
        } catch (err) {
            console.error(err);
        }
    });

    // Wait for all sections to be injected
    await Promise.all(fetches);

    // Now load main.js — all DOM elements exist at this point
    const script = document.createElement('script');
    script.src = 'js/main.js';
    document.body.appendChild(script);
})();
