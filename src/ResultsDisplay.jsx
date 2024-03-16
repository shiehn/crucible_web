function ResultsDisplay({ results }) {
  if (!results) {
    // If there is no contract, don't render anything
    return null;
  }

  const resultsValue = JSON.stringify(results, null, 2);

  // If there is a contract, render a white box with the contract value in black text
  return (
    <div className="w-full bg-white mt-4 p-4 rounded shadow-lg">
      <h4>RESULTS</h4>
      <span className="text-black">{resultsValue}</span>
    </div>
  );
}

export default ResultsDisplay;