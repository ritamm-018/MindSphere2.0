async function saveMoodProgress(userId, mood, notes) {
    try {
      const response = await fetch('http://localhost:5000/api/save-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, mood, notes }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Mood progress saved successfully');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Example usage
  document.getElementById('saveMoodButton').addEventListener('click', () => {
    const userId = 'user123'; // Replace with actual user ID
    const mood = document.getElementById('moodInput').value;
    const notes = document.getElementById('notesInput').value;
  
    saveMoodProgress(userId, mood, notes);
  });
  