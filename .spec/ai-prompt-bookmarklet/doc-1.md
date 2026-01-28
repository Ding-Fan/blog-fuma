Documentation: The Raw Prompt Injector1. The ProblemBrowser bookmark managers (Chrome, Firefox, Safari) cannot store Raw Text directly in the URL field for two reasons:Newline Stripping: Browsers automatically flatten newlines into spaces, destroying YAML/Python formatting.Syntax Conflicts: Characters like double quotes ("), single quotes ('), and backticks (`) inside your prompt break the JavaScript syntax of a standard bookmarklet.2. The Solution: "Encode-Decode" ArchitectureTo use your prompt exactly as is, we use a Generator Tool (a local HTML file) that performs the following transformation:Input: Takes your raw, multi-line string.Encoding: Runs encodeURIComponent() to convert all special characters and newlines into a safe, single-line string (e.g., %0A for newline, %60 for backtick).Encapsulation: Wraps this safe string inside a JavaScript payload.Runtime Decoding: When you click the bookmark, it runs decodeURIComponent() to restore the original formatting instantly before injecting it.3. ImplementationStep A: Create the GeneratorSave the following code as prompt_generator.html on your local machine (e.g., in your ~/Documents or ~/scripts folder).HTML<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Prompt Bookmarklet Generator</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; background: #f4f4f9; color: #333; }
        h2 { margin-top: 0; }
        textarea { width: 100%; height: 300px; padding: 15px; border-radius: 6px; border: 1px solid #ccc; font-family: 'Menlo', 'Monaco', 'Courier New', monospace; font-size: 13px; box-sizing: border-box; }
        input[type="text"] { padding: 10px; width: 300px; margin-top:15px; border: 1px solid #ccc; border-radius: 4px; }
        button { background: #007bff; color: white; border: none; padding: 10px 20px; font-size: 16px; border-radius: 4px; cursor: pointer; margin-left: 10px; }
        button:hover { background: #0056b3; }
        #output-area { margin-top: 30px; padding: 20px; background: white; border: 1px solid #e1e4e8; border-radius: 8px; display: none; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .drag-link { display: inline-block; padding: 12px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; cursor: move; }
        .drag-link:hover { background: #218838; }
        .instruction { color: #666; margin-bottom: 10px; }
    </style>
</head>
<body>

    <h2>1. Paste Raw Prompt (YAML/Code Safe)</h2>
    <p class="instruction">Paste your prompt exactly as you want it. No escaping needed.</p>
    <textarea id="rawPrompt" placeholder="---
system_boot:
  name: 'vMAS_Core_System'
..."></textarea>
    
    <br>
    <div style="display: flex; align-items: center;">
        <input type="text" id="bookmarkName" placeholder="Bookmark Name (e.g., vMAS Core)">
        <button onclick="generateBookmarklet()">Generate Link</button>
    </div>

    <div id="output-area">
        <h3>2. Drag to Bookmarks Bar</h3>
        <p class="instruction">Click and drag the green button below directly to your browser's bookmarks bar.</p>
        <a id="finalLink" class="drag-link" href="#" onclick="return false;">Drag Me to Bookmarks</a>
    </div>

    <script>
        function generateBookmarklet() {
            const rawText = document.getElementById('rawPrompt').value;
            const name = document.getElementById('bookmarkName').value || "My Prompt";
            
            if (!rawText.trim()) { alert("Please paste a prompt first!"); return; }

            // 1. ENCODE: Converts newlines and special chars to URL-safe string
            const encodedPrompt = encodeURIComponent(rawText);

            // 2. TEMPLATE: The actual JavaScript that runs on Gemini/ChatGPT
            const script = `javascript:(function(){
    /* Decode the safe string back to raw text */
    const p = decodeURIComponent("${encodedPrompt}");
    
    /* Detect Site */
    const input = document.querySelector('.ql-editor') || document.querySelector('#prompt-textarea') || document.querySelector('div[contenteditable="true"]');
    
    if (input) {
        input.focus();
        
        /* EXECUTE: Trusted Text Insertion (Bypasses innerHTML security) */
        /* This handles newlines automatically */
        const success = document.execCommand('insertText', false, p);
        
        /* Fallback for edge cases */
        if (!success) input.innerText = p;
        
        /* TRIGGER: Wake up React/Angular bindings */
        input.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
        alert("Chat input not found. Open Gemini or ChatGPT.");
    }
})();`;

            // 3. RENDER
            const linkBtn = document.getElementById('finalLink');
            linkBtn.setAttribute('href', script);
            linkBtn.textContent = name;
            document.getElementById('output-area').style.display = 'block';
        }
    </script>
</body>
</html>
4. User GuideCreating a New PromptOpen prompt_generator.html in your browser.Paste your vMAS (or any other) prompt into the text box.Name it (e.g., "vMAS Boot").Click Generate Link.Drag and drop the green button onto your browser's bookmarks bar.Injecting the PromptOpen Gemini (gemini.google.com) or ChatGPT (chatgpt.com).Click the "vMAS Boot" bookmark in your bar.Result: The script instantly decodes your text and types it into the chat box, preserving all YAML structure, quotes, and newlines.5. Technical CompatibilityBrowserSupportNotesChrome✅ FullBest performance.Firefox✅ FullWorks perfectly.Safari✅ FullEnsure "Show Favorites Bar" is on.Edge✅ FullSame as Chrome.6. LimitationsLength Limit: A single bookmarklet can hold approximately 60,000 characters. If your prompt exceeds this (e.g., a whole book), you must use the Tampermonkey method instead.Mobile: Bookmarklets are difficult to trigger on mobile browsers (Android/iOS). This is primarily a Desktop solution.
