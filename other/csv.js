// Data to be added
const data = [
  ["Name", "Age", "City"], // Header row
  ["John Doe", 28, "New York"],
  ["Jane Smith", 34, "Los Angeles"],
  ["Sam Wilson", 23, "Chicago"],
];

// Function to convert data array to CSV format
function arrayToCSV(data) {
  return data.map((row) => row.map((item) => `"${item}"`).join(",")).join("\n");
}

// Function to download CSV
function downloadCSV(filename, data) {
  const csvData = arrayToCSV(data); // Convert array to CSV string
  const blob = new Blob([csvData], { type: "text/csv" }); // Create a Blob
  const url = URL.createObjectURL(blob); // Generate a URL for the Blob

  // Create a temporary download link
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);

  // Trigger the download
  a.click();

  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Trigger CSV download when a button is clicked
document.getElementById("downloadBtn").addEventListener("click", () => {
  downloadCSV("example.csv", data); // Specify filename and data
});
