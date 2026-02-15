# Quiz-Clone

## Version 2
```javascript
(async () => {
    const navButtons = document.querySelectorAll('.qnbutton');
    const totalQuestions = navButtons.length;
    const baseUrl = window.location.href.split('&page=')[0];
    
    console.log(`Starting... Found ${totalQuestions} questions.`);

    let finalOutput = "";

    for (let i = 0; i < totalQuestions; i++) {
        try {
            const response = await fetch(`${baseUrl}&page=${i}`);
            const html = await response.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            
            const qContainer = doc.querySelector('.que');
            if (qContainer) {
                const qText = qContainer.querySelector('.qtext').innerText.trim();
                const options = Array.from(qContainer.querySelectorAll('.flex-fill.ml-1'))
                                     .map(opt => opt.innerText.trim());
                
                finalOutput += `Q${i + 1}: ${qText}\n`;
                finalOutput += options.map((o, idx) => `  ${String.fromCharCode(97 + idx)}) ${o}`).join('\n') + "\n\n";
            }
        } catch (e) {
            finalOutput += `Q${i + 1}: Error loading question\n\n`;
        }
        // Minimal delay to keep the connection stable
        await new Promise(r => setTimeout(r, 150));
    }

    // Final print to console
    console.clear();
    console.log(finalOutput);
})();
```














## Version 1
```javascript
(async () => {
    const totalPages = 10; // Change based on quiz length
    const baseUrl = window.location.href.split('&page=')[0];
    let allData = "";

    console.log("%c🚀 Starting Hyper-Scrape...", "color: cyan; font-weight: bold;");

    for (let i = 0; i < totalPages; i++) {
        const pageUrl = `${baseUrl}&page=${i}`;
        
        // Fetch the page HTML in the background
        const response = await fetch(pageUrl);
        const html = await response.text();
        
        // Parse the HTML string into a dummy document
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract Question & Options
        const questions = doc.querySelectorAll('.que'); 
        questions.forEach((q, index) => {
            const text = q.querySelector('.qtext').innerText.trim();
            const options = Array.from(q.querySelectorAll('.flex-fill.ml-1')).map(opt => opt.innerText.trim());
            
            allData += `Q${(i * questions.length) + index + 1}: ${text}\nOptions:\n- ${options.join('\n- ')}\n\n---\n\n`;
        });
        
        console.log(`✅ Scraped Page ${i + 1}`);
    }

    // Output the final list
    console.log("%c📦 SCRAPE COMPLETE! COPY BELOW:", "color: lime; font-weight: bold;");
    console.log(allData);
    
    // Optional: Download as a text file immediately
    const blob = new Blob([allData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Quiz_Questions.txt";
    link.click();
})();
```
