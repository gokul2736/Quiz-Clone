# DeepScrape-LMS🚀

An asynchronous JavaScript utility designed to automate structured data extraction from Moodle-based Learning Management Systems (LMS). By bypassing the standard frontend UI pagination and utilizing background fetch requests, it can load  a full quiz bank into a single console output in seconds.

## Overview
The script identifies the total number of questions via the DOM's navigation nodes and executes a concurrent-safe fetch loop.
It parses the incoming HTML strings using the DOMParser API, extracts specific question and option metadata, and formats them for easy archival or research.

##  Key Features
* Auto-Detection: Automatically calculates the total question count from the LMS navigation block.  
* Asynchronous Processing: Uses async/await and fetch to grab data without manual page clicks.  
* Console-Native: Zero dependencies. No external libraries or extensions required—runs directly in the browser environment.  
* Stealth Mode: Includes a randomized jitter delay to mimic human-like request patterns and prevent server-side socket hanging.  

## How to Use
### Method 1: The Bookmarklet (Easiest for Users)
1. Create a new bookmark in your browser.
2. Set the Name to DeepScrape or whatever u like  
3. Paste the following into the URL field:  
 
JavaScript  
```
javascript:(async()=>{const n=document.querySelectorAll('.qnbutton'),t=n.length,b=window.location.href.split('&page=')[0];if(!t)return;console.clear();for(let i=0;i<t;i++){try{const r=await fetch(`${b}&page=${i}`),h=await r.text(),d=new DOMParser().parseFromString(h,'text/html'),q=d.querySelector('.que');if(q){const x=q.querySelector('.qtext').innerText.trim(),s=Array.from(q.querySelectorAll('.flex-fill.ml-1')).map(a=>a.innerText.trim());console.log(`Q${i+1}: ${x}\n${s.map((v,j)=>`  ${String.fromCharCode(97+j)}) ${v}`).join('\n')}\n\n`)}}catch(e){}await new Promise(r=>setTimeout(r,150))}})();
```

### Method 2: Developer Console
1. Open the Quiz page on the LMS.  

2. Press F12 and go to the Console tab.  

3. Paste the script provided in scraper.js and hit Enter.  

## Use Case
This utility was created to solve the inefficiency of manual pagination on Moodle-based platforms. It allows students to aggregate their own quiz questions into a single view for offline study and archival. It is a practical application of asynchronous JavaScript, demonstrating how to handle background data retrieval and DOM parsing to improve user workflow.

## ⚠️ Disclaimer
For Educational Research Purposes Only

* Academic Integrity: This tool is intended for personal study and archival use only. It should not be used during active, proctored examinations.  
* Ethical Usage: Users are responsible for ensuring their use of this script complies with their institution's ICT policies and Terms of Service. 
* Liability: The author assumes no responsibility for how this tool is used by third parties. It is provided "as-is" for technical demonstration.  


# Code for Console (methord 2)
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
