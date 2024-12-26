document.getElementById("calculateBtn").addEventListener("click", calculateTimeLeft);

function calculateTimeLeft() {
  const timezoneInput = document.getElementById("timezone").value;

  // Update regular expression to support both whole number and fractional timezones (e.g., UTC+5, UTC-5:30, UTC+5:30)
  const offsetMatch = timezoneInput.match(/^UTC([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (offsetMatch) {
    const sign = offsetMatch[1]; // "+" or "-"
    const hours = parseInt(offsetMatch[2], 10); // Extract hours
    const minutes = offsetMatch[3] ? parseInt(offsetMatch[3], 10) : 0; // Extract minutes, default to 0 if not present

    // Calculate total offset in minutes
    const totalOffsetMinutes = (hours * 60 + minutes) * (sign === "+" ? 1 : -1);

    // Create a new date object for the last moment of 2025 in UTC
    const endOf2025 = new Date("2025-12-31T23:59:59Z");

    // Adjust the end time by the user's timezone offset in minutes
    endOf2025.setMinutes(endOf2025.getMinutes() + totalOffsetMinutes);

    // Start the countdown
    const countdownInterval = setInterval(function () {
      const currentTime = new Date();
      const remainingTime = endOf2025 - currentTime; // in milliseconds

      // If the countdown is finished, stop the interval
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("remainingTime").textContent = "The year 2025 has ended!";
        return;
      }

      // Convert remaining time to hours, minutes, and seconds
      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      // Display the remaining time
      document.getElementById("remainingTime").textContent =
        `Time left for 2025: ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
    }, 1000); // Update every second
  } else {
    document.getElementById("remainingTime").textContent = "Please enter a valid timezone (e.g., UTC+5 or UTC+5:30).";
  }
}

// Dynamically generate a list of UTC offsets in 30-minute increments
const timezoneInput = document.getElementById('timezone');
const timezoneList = document.getElementById('timezone-list');

// Generate UTC offsets from -12:00 to +14:00 in 30-minute increments
function generateUTCOffsets() {
  const offsets = [];
  for (let hour = -12; hour <= 14; hour++) {
    const hourStr = String(Math.abs(hour)).padStart(2, '0');
    offsets.push(`UTC${hour >= 0 ? '+' : '-'}${hourStr}:00`);
    if (hour !== 14) {
      offsets.push(`UTC${hour >= 0 ? '+' : '-'}${hourStr}:30`);
    }
  }
  return offsets;
}

// Populate the dropdown list with generated UTC offsets
const offsets = generateUTCOffsets();
offsets.forEach((offset) => {
  const li = document.createElement('li');
  li.textContent = offset;
  li.style.cursor = 'pointer';
  li.style.padding = '5px';
  li.addEventListener('click', () => {
    timezoneInput.value = offset; // Set the input to the clicked offset
    timezoneList.style.display = 'none'; // Hide the list after selection
  });
  timezoneList.appendChild(li);
});

// Show and filter the list as the user types
timezoneInput.addEventListener('input', () => {
  const searchText = timezoneInput.value.toLowerCase();
  timezoneList.style.display = 'block'; // Show the list
  Array.from(timezoneList.children).forEach((li) => {
    if (li.textContent.toLowerCase().includes(searchText)) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  });
});

// Hide the list when clicking outside
document.addEventListener('click', (event) => {
  if (!timezoneInput.contains(event.target) && !timezoneList.contains(event.target)) {
    timezoneList.style.display = 'none';
  }
});

