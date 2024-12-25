document.getElementById("calculateBtn").addEventListener("click", calculateTimeLeft);

function calculateTimeLeft() {
  const timezoneInput = document.getElementById("timezone").value;

  // Get the current time in UTC
  const now = new Date();

  // Get the user's timezone offset from input
  const offsetMatch = timezoneInput.match(/^UTC([+-]\d+)$/);
  if (offsetMatch) {
    const offsetHours = parseInt(offsetMatch[1]);

    // Create a new date object for the last moment of 2025
    const endOf2025 = new Date("2025-12-31T23:59:59Z");

    // Adjust the end time by the user's timezone offset
    endOf2025.setHours(endOf2025.getHours() + offsetHours);

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
    document.getElementById("remainingTime").textContent = "Please enter a valid timezone (e.g., UTC+5).";
  }
}
