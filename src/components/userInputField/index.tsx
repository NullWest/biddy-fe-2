import React, { useState } from "react";

export default function UserInputField({ onSubmit }: { onSubmit: Function }) {
  const [text, setText] = useState('');
  const [rows, setRows] = useState(1);
  const maxRows = 7;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 24; // Approximate line height in pixels for Tailwind
    const previousRows = event.target.rows;
    event.target.rows = 1; // reset number of rows in textarea

    const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setText(event.target.value);
    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  const handleSubmit = () => {
    if (text.trim()) { // Ensure text is not just whitespace
      onSubmit(text);
      setText(''); // Clear the text area after submission
      setRows(1); // Reset textarea rows
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Submit on Enter, not Shift+Enter
      event.preventDefault(); // Prevent new line
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex flex-col justify-end">
      <textarea
        className="w-full p-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={rows}
        value={text}
        placeholder="Type anything..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ resize: 'none' }}
      />
      <div className="w-full flex "></div>
      <button className="justify-end flex p-2 hover:underline" onClick={handleSubmit}>Enter</button>
    </div>
  );
}