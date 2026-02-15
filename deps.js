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
