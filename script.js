document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. PIPELINE CONNECTION CONFIGURATIONS ---
    const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsdhTv5mX2Hbz747QFvF5f2MTYgHgOJkFXmfP7KMozGUinQ_j7AO3czLiy8ORe9ICS4u9feau64Uao/pub?gid=0&single=true&output=csv";
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZXMk085Vq2a-VIcsoZgAqeeWLZd3J-_NqUabUVwjRLcymkJSFWScCfbhQdsWxNwns/exec";

    // --- 2. CORE ANTI-FREEZE SYSTEM ---
    function deactivateLoadingScreen() {
        const loader = document.getElementById('loading-screen');
        if (loader && loader.style.opacity !== '0') {
            loader.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 350);
        }
    }
    // Hard structural timeout safety fallback backup rule
    setTimeout(deactivateLoadingScreen, 1500);

    // Initial runtime local state fallback array matching Akash's profile scope
    let dynamicPosts = [
        {
            id: "1",
            title: "Mitigating Breaches and Structural RTO Drivers in Quick Commerce",
            content: "Mitigating logistics anomalies across hyperlocal networks requires deep routing logic oversight. In express operations, reducing breaches down to under 4% relies on active courier capacity tracking and automated warehouse dispatch checkpoints.",
            date: "June 2026",
            likes: 42,
            dislikes: 0,
            comments: [{user: "SystemMemory", message: "Internal portfolio state asset synchronized successfully."}]
        }
    ];

    // --- 3. PUBLIC INTERACTION DATABASE STREAMER ---
    window.transmitInteraction = async function(postId, type, rawValue) {
        const payload = {
            postId: postId.toString(),
            type: type,
            content: rawValue.trim(),
            timestamp: new Date().toISOString()
        };

        // UI Optimistic Upgrades for instantaneous response perception
        if (type === 'like' || type === 'dislike') {
            const countSpan = document.getElementById(`${type}-count-${postId}`);
            if (countSpan) {
                const currentCount = parseInt(countSpan.textContent.replace(/[^\d]/g, '')) || 0;
                countSpan.textContent = currentCount + 1;
            }
        } else if (type === 'comment') {
            const wrapper = document.getElementById(`comments-wrapper-${postId}`);
            if (wrapper) {
                const dummyElement = document.createElement('div');
                dummyElement.className = 'single-cmt';
                dummyElement.innerHTML = `<strong>@Visitor:</strong> ${rawValue.replace(/</g, "&lt;")}`;
                wrapper.appendChild(dummyElement);
            }
        }

        try {
            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            console.log("Transmission interaction logs saved successfully.");
        } catch (error) {
            console.error("Transmission error encountered across grid pipeline:", error);
        }
    };

    window.executeCommentSubmission = function(postId) {
        const targetInput = document.getElementById(`comment-input-${postId}`);
        if (!targetInput || !targetInput.value.trim()) return;

        const commentText = targetInput.value.trim();
        window.transmitInteraction(postId, 'comment', commentText);
        targetInput.value = '';
    };

    window.executeVote = function(postId, type) {
        window.transmitInteraction(postId, type, 'voted');
    };

    // --- 4. DYNAMIC DOM INTERACTION ENGINE RENDERER ---
    function constructBlogConsole() {
        const wrapper = document.getElementById('live-blog-wrapper');
        if (!wrapper) return;
        wrapper.innerHTML = '';

        dynamicPosts.forEach((post) => {
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
                <span class="blog-timestamp"><i class="far fa-calendar-alt"></i> METRIC_LOG // ${post.date}</span>
                <h3>${post.title}</h3>
                <p style="margin-top: 10px; color: var(--text-neon); font-size: 0.9rem;">${post.content}</p>
                
                <div class="blog-interactive-row">
                    <button class="engagement-trigger" onclick="window.executeVote('${post.id}', 'like')">
                        <i class="far fa-thumbs-up"></i> Upvote Log (<span id="like-count-${post.id}">${post.likes}</span>)
                    </button>
                    <button class="engagement-trigger" onclick="window.executeVote('${post.id}', 'dislike')">
                        <i class="far fa-thumbs-down"></i> Downvote Log (<span id="dislike-count-${post.id}">${post.dislikes}</span>)
                    </button>
                </div>

                <div class="comment-logs-box">
                    <h6>Public Ledger Records</h6>
                    <div class="comments-list-wrapper" id="comments-wrapper-${post.id}">${stringifiedComments}</div>
                    <div class="cmt-input-dock">
                        <input type="text" id="comment-input-${post.id}" placeholder="Input data query responses directly onto node...">
                        <button class="console-cta" onclick="window.executeCommentSubmission('${post.id}')">Submit</button>
                    </div>
                </div>
            `;
            wrapper.appendChild(article);
        });
        deactivateLoadingScreen();
    }

    // --- 5. GOOGLE SHEETS PIPELINE STREAM PARSER ---
    async function ingestGoogleSheetsDatabase() {
        try {
            const networkResponse = await fetch(SHEET_CSV_URL);
            const csvRawText = await networkResponse.text();
            
            const csvRows = csvRawText.split(/\r?\n/);
            const compiledPosts = [];

            for (let i = 1; i < csvRows.length; i++) {
                if (!csvRows[i].trim()) continue;
                
                // Advanced regex parser handling cell splits containing internal punctuation safely
                const matches = csvRows[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || csvRows[i].split(',');
                const cleanCells = matches.map(cell => cell.replace(/^"|"$/g, '').trim());

                if (cleanCells.length < 3 || !cleanCells[0]) continue;
                
                compiledPosts.push({
                    id: cleanCells[0],
                    title: cleanCells[1],
                    content: cleanCells[2],
                    date: cleanCells[3] ? cleanCells[3] : "Active Session",
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
            console.error("Ingestion pipeline broken: ", fault);
            const loggingPanel = document.getElementById('blog-error-handler');
            if (loggingPanel) {
                loggingPanel.classList.remove('dynamic-hide');
                loggingPanel.textContent = "Data connection notice: Remote cloud sheet compilation error. Local operational memory layers loaded instead.";
            }
            constructBlogConsole();
        }
    }

    ingestGoogleSheetsDatabase();
});
