"use client";
import { useState } from "react";
import Select from "react-select";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await fetch(
        "https://bajab-challenge-server.onrender.com/bfhl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedJson),
        }
      );
      const data = await res.json(); // Corrected to parse the JSON response
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON input or error with API call.");
    }
  };

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          BFHL Challenge - 21BCE11420
        </h1>
        <textarea
          rows="10"
          className="w-full p-4 mb-4 text-gray-900 bg-gray-200 rounded-lg"
          placeholder='Enter JSON here... e.g., {"data": ["A", "1", "z"]}'
          value={jsonInput}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 mb-4 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
        >
          Submit
        </button>

        {response && (
          <div>
            <Select
              isMulti
              name="options"
              options={options}
              className="basic-multi-select mb-4 text-gray-900"
              classNamePrefix="select"
              onChange={handleDropdownChange}
            />
            <div className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Response:</h2>
              {selectedOptions.map((option) => (
                <div key={option.value} className="mb-2">
                  <strong>{option.label}:</strong>{" "}
                  {JSON.stringify(response[option.value])}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
