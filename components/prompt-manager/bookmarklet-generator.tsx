'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  promptContent: string;
  promptTitle: string;
}

export function BookmarkletGenerator({ promptContent, promptTitle }: Props) {
  const [copySuccess, setCopySuccess] = useState<'text' | 'bookmarklet' | null>(null);
  const bookmarkLinkRef = useRef<HTMLAnchorElement>(null);

  const generateBookmarklet = () => {
    // Use Base64 encoding to completely avoid string escaping issues
    const base64Prompt = btoa(unescape(encodeURIComponent(promptContent)));

    // Universal selector (auto-detect platform) with Base64 decoding and error handling
    return `javascript:(function(){try{const p=decodeURIComponent(escape(atob('${base64Prompt}')));const input=document.querySelector('.ql-editor')||document.querySelector('#prompt-textarea')||document.querySelector('div[contenteditable="true"]');if(input){input.focus();const success=document.execCommand('insertText',false,p);if(!success)input.innerText=p;input.dispatchEvent(new Event('input',{bubbles:true}));}else{alert('Chat input not found. Open ChatGPT, Gemini, or Claude.');}}catch(e){alert('Bookmarklet error: '+e.message);}})();`;
  };

  const copyBookmarkletCode = async () => {
    try {
      await navigator.clipboard.writeText(generateBookmarklet());
      setCopySuccess('bookmarklet');
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyPromptText = async () => {
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopySuccess('text');
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Set href after mount to avoid React security error
  useEffect(() => {
    if (bookmarkLinkRef.current) {
      bookmarkLinkRef.current.href = generateBookmarklet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptContent, promptTitle]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={copyPromptText}
          className="px-4 py-2 text-sm bg-fd-secondary text-fd-secondary-foreground rounded hover:bg-fd-secondary/80 transition-colors"
        >
          {copySuccess === 'text' ? '✓ Copied!' : '📋 Copy Text'}
        </button>
        <button
          onClick={copyBookmarkletCode}
          className="px-4 py-2 text-sm bg-fd-secondary text-fd-secondary-foreground rounded hover:bg-fd-secondary/80 transition-colors"
        >
          {copySuccess === 'bookmarklet' ? '✓ Copied!' : '📝 Copy Bookmarklet'}
        </button>
      </div>

      {/* Draggable Link */}
      <div className="p-4 bg-fd-muted border border-fd-border rounded">
        <p className="text-sm text-fd-muted-foreground mb-2">
          <strong>Option 1:</strong> Drag this link to your bookmarks bar:
        </p>
        <a
          ref={bookmarkLinkRef}
          href="#"
          title={promptTitle}
          className="inline-block px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded font-semibold hover:bg-green-700 dark:hover:bg-green-800 transition-colors cursor-move select-none"
          onClick={(e) => e.preventDefault()}
          draggable="true"
        >
          📌 {promptTitle}
        </a>
        <p className="text-xs text-fd-muted-foreground mt-3">
          <strong>Option 2:</strong> Click &quot;Copy Bookmarklet&quot; above, then:
        </p>
        <ol className="text-xs text-fd-muted-foreground mt-1 ml-4 list-decimal space-y-1">
          <li>Create a new bookmark in your browser</li>
          <li>Paste the copied code as the URL</li>
           <li>Name it &quot;{promptTitle}&quot;</li>
        </ol>
        <p className="text-xs text-fd-muted-foreground mt-2 text-green-600 dark:text-green-400">
          ✓ Works on ChatGPT, Gemini, and Claude
        </p>
      </div>
    </div>
  );
}
