async function submitDataToSheets(data) {
    const url = "https://script.google.com/macros/s/AKfycbzOzriMEPPNI0Bbs1xV053GOwnDYEeQMfGm6gl526NHEZ-3UNw42JpPpoVThZlZTp6E/exec"; // Replace with your Web App URL
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.text();
      console.log(result); // "Success" if the submission worked
    } catch (error) {
      console.error("Error:", error);
    }
  }
  


function calculateGAD7() {
    let totalScore = 0;
    for (let i = 1; i <= 7; i++) {
      const question = document.querySelector(`input[name="q${i}"]:checked`);
      if (question) {
        totalScore += parseInt(question.value);
      }
    }
    document.getElementById('gad7-result').innerText = `Your GAD-7 Score: ${totalScore}`;
  }
  
  function calculatePHQ9() {
    let totalScore = 0;
    for (let i = 1; i <= 9; i++) {
      const question = document.querySelector(`input[name="q${i}"]:checked`);
      if (question) {
        totalScore += parseInt(question.value);
      }
    }
    document.getElementById('phq9-result').innerText = `Your PHQ-9 Score: ${totalScore}`;
  }

  document.getElementById('daily-dashboard-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Gather Moods Data
    const moodCheckboxes = document.querySelectorAll('#mood-section input[name="mood"]:checked');
    const moods = Array.from(moodCheckboxes).map(cb => cb.value).join(', ');
  
    // Gather Sleep Data
    const hoursSleep = document.getElementById('sleep-hours').value || '';
    const bedtime = document.getElementById('bedtime').value || '';
    const waketime = document.getElementById('waketime').value || '';
  
    // Gather GAD-7 Data
    let gad7Score = 0;
    for (let i = 1; i <= 7; i++) {
      const gad7Answer = document.querySelector(`input[name="q${i}"]:checked`);
      gad7Score += gad7Answer ? parseInt(gad7Answer.value) : 0;
    }
  
    // Gather PHQ-9 Data
    let phq9Score = 0;
    for (let i = 1; i <= 9; i++) {
      const phq9Answer = document.querySelector(`input[name="phq_q${i}"]:checked`);
      phq9Score += phq9Answer ? parseInt(phq9Answer.value) : 0;
    }
  
    // Combine all data into one object in the correct order
    const formData = {
      timestamp: new Date().toISOString(),
      moods: moods,
      hoursSleep: hoursSleep,
      bedtime: bedtime,
      waketime: waketime,
      gad7Score: gad7Score,
      phq9Score: phq9Score
    };
  
    console.log(formData); // For debugging purposes
  
    // Send the data to Google Sheets
    submitDataToSheets(formData);
  });
  