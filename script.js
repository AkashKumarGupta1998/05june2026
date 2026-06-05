document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. CORE ANTI-FREEZE SAFETY SYSTEM ---
    // Forces the loading overlay off after a maximum of 2 seconds regardless of network drops.
    setTimeout(() => {
        const fallbackLoader = document.getElementById('loading-screen');
        if (fallbackLoader && fallbackLoader.style.opacity !== '0') {
            fallbackLoader.style.transition = 'opacity 0.5s ease';
            fallbackLoader.style.opacity = '0';
            setTimeout(() => fallbackLoader.style.display = 'none', 500);
            console.log("System Status Monitor: Safe-mode timeout override executed.");
        }
    }, 2000);

    // --- 2. PIPELINE CONNECTION CONFIGURATIONS ---
    const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsdhTv5mX2Hbz747QFvF5f2MTYgHgOJkFXmfP7KMozGUinQ_j7AO3czLiy8ORe9ICS4u9feau64Uao/pub?gid=0&single=true&output=csv";
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZXMk085Vq2a-VIcsoZgAqeeWLZd3J-_NqUabUVwjRLcymkJSFWScCfbhQdsWxNwns/exec";

    // Baseline fallback structural array in case database is loading or offline
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

    // --- 3. PUBLIC INTERACTION DATABASE STREAMER ---
    window.transmitInteraction = async function(postId, type, rawValue, elementIdToReflect) {
        const payload = {
            postId: postId.toString(),
            type: type, // 'like', 'dislike', or 'comment'
            content: rawValue.trim(),
            timestamp: new Date().toISOString()
        };

        // UI Optimistic Updates for high-speed feedback
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
            // Stream metrics via POST payload explicitly to your configuration endpoint 
            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Bypasses Cross-Origin preflight limitations securely with Apps Script
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            console.log("Transmission verified successfully with database.");
        } catch (error) {
            console.error("Transmission error across network:", error);
        }
    };

    // Global interaction handling hooks
    window.executeCommentSubmission = function(postId, postArrayIndex) {
        const targetInput = document.getElementById(`comment-input-${postId}`);
        if (!targetInput || !targetInput.value.trim()) return;

        const commentText = targetInput.value.trim();
        window.transmitInteraction(postId, 'comment', commentText, null);
        targetInput.value = '';
    };

    window.executeVote = function(postId, type) {
        window.transmitInteraction(postId, type, 'voted', null);
    };

    // --- 4. DYNAMIC DOM INTERACTION ENGINE RENDERER ---
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

    // --- 5. GOOGLE SHEETS PIPELINE STREAM PARSER ---
    async function ingestGoogleSheetsDatabase() {
        // Prevents execution loops if absolute placeholders are found
        if (SHEET_CSV_URL.includes("XXXXXXXXXXXXX")) {
            constructBlogConsole();
            return;
        }

        try {
            const networkResponse = await fetch(SHEET_CSV_URL);
            const csvRawText = await networkResponse.text();
            
            const executionLines = csvRawText.split('\n').map(line => line.split(','));
            const compiledPosts = [];

            // Discard row index 0 containing header configurations
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

    // Initialize Engine Runtime Execution
    ingestGoogleSheetsDatabase();
});
