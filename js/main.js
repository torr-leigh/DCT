/* async function submitDataToSheets(data) {
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
      const question = document.querySelector(`input[name="gad7_q${i}"]:checked`);
      if (question) {
        totalScore += parseInt(question.value);
      }
    }
    document.getElementById('gad7-result').innerText = `Your GAD-7 Score: ${totalScore}`;
  }
  
  function calculatePHQ9() {
    let totalScore = 0;
    for (let i = 1; i <= 9; i++) {
      const question = document.querySelector(`input[name="phq9_q${i}"]:checked`);
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
    const bedtime = document.getElementById('bedtime').value || '';
    const waketime = document.getElementById('waketime').value || '';
    const hoursSleep = document.getElementById('sleep-hours').value || '';

    // Gather GAD-7 Data
    let gad7Score = 0;
    for (let i = 1; i <= 7; i++) {
      const gad7Answer = document.querySelector(`input[name="gad7_q${i}"]:checked`);
      gad7Score += gad7Answer ? parseInt(gad7Answer.value) : 0;
    }

    // Gather PHQ-9 Data
    let phq9Score = 0;
    for (let i = 1; i <= 9; i++) {
      const phq9Answer = document.querySelector(`input[name="phq9_q${i}"]:checked`);
      phq9Score += phq9Answer ? parseInt(phq9Answer.value) : 0;
    }

  
    // Combine all data into one object in the correct order
    const formData = {
      timestamp: new Date().toISOString(),
      moods: moods,
      bedtime: bedtime,
      waketime: waketime,
      hoursSleep: hoursSleep,
      gad7Score: gad7Score,
      phq9Score: phq9Score
    };
  
    console.log(formData); // For debugging purposes
  
    // Send the data to Google Sheets
    submitDataToSheets(formData);
  });
  
  function calculateSleepHours() {
    const bedtime = document.getElementById('bedtime').value;
    const waketime = document.getElementById('waketime').value;
    const display = document.getElementById('sleep-hours-display');
  
    if (!bedtime || !waketime) {
      display.textContent = 'Hours of Sleep: ';
      return;
    }
  
    // Convert Bedtime and Waketime to Date Objects
    const bedtimeDate = convertTo24HourTime(bedtime);
    const waketimeDate = convertTo24HourTime(waketime);
  
    // Calculate the Difference in Milliseconds
    let sleepDuration = waketimeDate - bedtimeDate;
  
    // Handle Sleep Durations That Cross Midnight
    if (sleepDuration < 0) {
      sleepDuration += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
    }
  
    // Convert Milliseconds to Hours
    const hoursSleep = (sleepDuration / (1000 * 60 * 60)).toFixed(2);
  
    // Display the Result
    display.textContent = `Hours of Sleep: ${hoursSleep}`;
  }
  
  // Helper Function to Convert 12-Hour Time to 24-Hour Date Object
  function convertTo24HourTime(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
  
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
   */

 // Function to calculate hours of sleep
function calculateSleepHours() {
  const bedtime = document.getElementById('bedtime').value;
  const waketime = document.getElementById('waketime').value;
  const display = document.getElementById('sleep-hours-display');

  if (!bedtime || !waketime) {
    display.textContent = 'Hours of Sleep: ';
    return '';
  }

  // Convert Bedtime and Waketime to Date Objects
  const bedtimeDate = convertTo24HourTime(bedtime);
  const waketimeDate = convertTo24HourTime(waketime);

  // Calculate the Difference in Milliseconds
  let sleepDuration = waketimeDate - bedtimeDate;

  // Handle Sleep Durations That Cross Midnight
  if (sleepDuration < 0) {
    sleepDuration += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
  }

  // Convert Milliseconds to Hours
  const hoursSleep = (sleepDuration / (1000 * 60 * 60)).toFixed(2);

  // Display the Result
  display.textContent = `Hours of Sleep: ${hoursSleep}`;

  return hoursSleep;
}

// Helper Function to Convert 12-Hour Time to 24-Hour Date Object
function convertTo24HourTime(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

// Function to handle full form submission
document.getElementById('daily-dashboard-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Gather Moods Data
  const moodCheckboxes = document.querySelectorAll('#mood-section input[name="mood"]:checked');
  const moods = Array.from(moodCheckboxes).map(cb => cb.value).join(', ');

  // Gather Sleep Data
  const bedtime = document.getElementById('bedtime').value;
  const waketime = document.getElementById('waketime').value;
  const hoursSleep = calculateSleepHours();

  // Gather GAD-7 Data
  let gad7Score = 0;
  for (let i = 1; i <= 7; i++) {
    const gad7Answer = document.querySelector(`input[name="gad7_q${i}"]:checked`);
    gad7Score += gad7Answer ? parseInt(gad7Answer.value) : 0;
  }

  // Gather PHQ-9 Data
  let phq9Score = 0;
  for (let i = 1; i <= 9; i++) {
    const phq9Answer = document.querySelector(`input[name="phq9_q${i}"]:checked`);
    phq9Score += phq9Answer ? parseInt(phq9Answer.value) : 0;
  }

  // Combine all data into one object
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

// Function to send data to Google Sheets
async function submitDataToSheets(data) {
  const url = "https://script.google.com/macros/s/AKfycbzdIbp-sA5TDBqDL0BBOqwsXeP1ksgBMfftl5Hcii1c2S-H2KOz4-7QzWlsIH_45bp8/exec"; // Replace with your Google Apps Script deployment URL

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    console.log(result); // "Success" if submission worked
    alert("Data submitted successfully!");
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error submitting the data.");
  }
}
 
