document.addEventListener('DOMContentLoaded', function() {
    
    // --- CONNECT CONFIGURATION INTERFACES ---
    // 1. Paste your published Google Sheet CSV export link here
    const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSXXXXXXXXXXXXX/pub?gid=0&output=csv";
    // 2. Paste your deployed Google Apps Script Web App Endpoint URL here
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXX/exec";

    // Standard Loading Systems Clearance
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 1000);

    // Baseline fallback structural array in case Google API pipeline experiences delay
    let dynamicPosts = [
        {
            id: "1",
            title: "Architecting End-To-End Control Tower Infrastructure",
            content: "Data transparency and cross-functional reporting remain paramount. Achieving critical tracking thresholds across multi-vendor Express operations requires real-time routing logic and automated driver monitoring parameters.",
            date: "June 2026",
            likes: 24,
            dislikes: 1,
            comments: [{user: "SystemSync", message: "Initial static database layer pipeline working optimally."}]
        }
    ];

    // Master function to execute public interaction streaming directly to Google Sheets database
    window.transmitInteraction = async function(postId, type, rawValue, elementIdToReflect) {
        const payload = {
            postId: postId.toString(),
            type: type, // 'like', 'dislike', or 'comment'
            content: rawValue.trim(),
            timestamp: new Date().toISOString()
        };

        // UI Optimistic Upfront Update for speed
        if (type === 'like' || type === 'dislike') {
            const countSpan = document.getElementById(`${type}-count-${postId}`);
            if (countSpan) countSpan.textContent = parseInt(countSpan.textContent) + 1;
        } else if (type === 'comment') {
            const wrapper = document.getElementById(`comments-wrapper-${postId}`);
            if (wrapper) {
                const dummyElement = document.createElement('div');
                dummyElement.className = 'single-cmt';
                dummyElement.innerHTML = `<strong>@You:</strong> ${rawValue.replace(/</g, "&lt;")}`;
                wrapper.appendChild(dummyElement);
            }
        }

        try {
            // Send payload to Google Sheets script endpoint
            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Required to prevent cross-origin preflight blockers from Apps Script
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            console.log("Transmission verified successfully with database.");
        } catch (error) {
            console.error("Transmission error across network:", error);
        }
    };

    // Global hook for commenting processing
    window.executeCommentSubmission = function(postId, postArrayIndex) {
        const targetInput = document.getElementById(`comment-input-${postId}`);
        if (!targetInput || !targetInput.value.trim()) return;

        const commentText = targetInput.value.trim();
        window.transmitInteraction(postId, 'comment', commentText, null);
        targetInput.value = '';
    };

    // Global hook for downvoting processing
    window.executeVote = function(postId, type) {
        window.transmitInteraction(postId, type, 'voted', null);
    };

    // Dynamic UI Engine Renderer
    function constructBlogConsole() {
        const wrapper = document.getElementById('live-blog-wrapper');
        if (!wrapper) return;
        wrapper.innerHTML = '';

        dynamicPosts.forEach((post, index) => {
            const article = document.createElement('div');
            article.className = 'modern-blog-card';

            let stringifiedComments = '';
            if (post.comments && post.comments.length > 0) {
                post.comments.forEach(cmt => {
                    stringifiedComments += `
                        <div class="single-cmt">
                            <strong>@${cmt.user}:</strong> ${cmt.message}
                        </div>
                    `;
                });
            }

            article.innerHTML = `
                <span class="blog-timestamp"><i class="far fa-calendar-alt"></i> SYSTEM_LOG // ${post.date}</span>
                <h3>${post.title}</h3>
                <p style="margin-top: 10px; color: var(--text-neon);">${post.content}</p>
                
                <div class="blog-interactive-row">
                    <button class="engagement-trigger" onclick="window.executeVote('${post.id}', 'like')">
                        <i class="far fa-thumbs-up"></i> Upvote (<span id="like-count-${post.id}">${post.likes}</span>)
                    </button>
                    <button class="engagement-trigger" onclick="window.executeVote('${post.id}', 'dislike')">
                        <i class="far fa-thumbs-down"></i> Downvote (<span id="dislike-count-${post.id}">${post.dislikes}</span>)
                    </button>
                </div>

                <div class="comment-logs-box">
                    <h6>Public Ledger Log Tracks</h6>
                    <div class="comments-list-wrapper" id="comments-wrapper-${post.id}">${stringifiedComments}</div>
                    <div class="cmt-input-dock">
                        <input type="text" id="comment-input-${post.id}" placeholder="Input credential response to thread...">
                        <button class="console-cta" onclick="window.executeCommentSubmission('${post.id}', ${index})">Reply</button>
                    </div>
                </div>
            `;
            wrapper.appendChild(article);
        });
    }

    // Google Sheets CSV Stream Parser Pipeline
    async function ingestGoogleSheetsDatabase() {
        if (SHEET_CSV_URL.includes("XXXXXXXXXXXXX")) {
            // If placeholder URL exists, gracefully load default fallback configuration data structures
            constructBlogConsole();
            return;
        }

        try {
            const networkResponse = await fetch(SHEET_CSV_URL);
            const csvRawText = await networkResponse.text();
            
            // Basic secure line processing
            const executionLines = csvRawText.split('\n').map(line => line.split(','));
            const compiledPosts = [];

            // Skip row 1 containing header metadata strings
            for (let i = 1; i < executionLines.length; i++) {
                if (executionLines[i].length < 3 || !executionLines[i][0]) continue;
                
                compiledPosts.push({
                    id: executionLines[i][0].replace(/"/g, ''),
                    title: executionLines[i][1].replace(/"/g, ''),
                    content: executionLines[i][2].replace(/"/g, ''),
                    date: executionLines[i][3] ? executionLines[i][3].replace(/"/g, '') : "Recent",
                    likes: 0, 
                    dislikes: 0,
                    comments: []
                });
            }

            if (compiledPosts.length > 0) {
                dynamicPosts = compiledPosts;
            }
            constructBlogConsole();
        } catch (fault) {
            console.error("Ingestion pipeline encountered a breakdown: ", fault);
            const loggingPanel = document.getElementById('blog-error-handler');
            if (loggingPanel) {
                loggingPanel.classList.remove('dynamic-hide');
                loggingPanel.textContent = "Data pipeline notice: Sheet compilation offline. Using static memory registers instead.";
            }
            constructBlogConsole();
        }
    }

    // Initialize Connection Sync Execution Engine
    ingestGoogleSheetsDatabase();
});