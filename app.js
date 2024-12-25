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
