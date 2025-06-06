import React from "react";

const ShareFab = () => {
  const handleShare = async () => {
    const shareData = {
      title: "Portfolio – Pagadala Chennakesava",
      text: "Check out this awesome developer portfolio!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      // Fallback for unsupported browsers
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("✅ Link copied to clipboard!");
      } catch (err) {
        alert("❌ Could not copy link.");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-1 right-5 z-50 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
      title="Share Portfolio"
    >
      <svg 
        fill="#000000" 
        width="18px" height="18px" 
        viewBox="0 0 52 52" 
        xmlns="http://www.w3.org/2000/svg">

        <g>
          <path 
            d="m48.5 30h-3c-0.8 0-1.5 0.7-1.5 1.5v11c0 0.8-0.7 1.5-1.5 1.5h-33c-0.8 0-1.5-0.7-1.5-1.5v-21c0-0.8 0.7-1.5 1.5-1.5h4c0.8 0 1.5-0.7 1.5-1.5v-3c0-0.8-0.7-1.5-1.5-1.5h-7.5c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4v-14.5c0-0.8-0.7-1.5-1.5-1.5z m-14.5-16c-10 0-19.1 8.9-19.9 19.4-0.1 0.8 0.6 1.6 1.5 1.6h3c0.8 0 1.4-0.6 1.5-1.3 0.7-7.5 7.1-13.7 14.9-13.7h1.6c0.9 0 1.3 1.1 0.7 1.7l-5.5 5.6c-0.6 0.6-0.6 1.5 0 2.1l2.1 2.1c0.6 0.6 1.5 0.6 2.1 0l13.6-13.5c0.6-0.6 0.6-1.5 0-2.1l-13.5-13.5c-0.6-0.6-1.5-0.6-2.1 0l-2.1 2.1c-0.6 0.6-0.7 1.5-0.1 2.1l5.6 5.6c0.6 0.6 0.2 1.7-0.7 1.7l-2.7 0.1z">
          </path>
        </g>

      </svg>
    </button>
  );
};

export default ShareFab;
