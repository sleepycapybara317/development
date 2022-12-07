import React, { useState } from 'react';

export default function Checkbox ({ label }) {
    const [check, setCheck] = useState(false);
    return (
      <div className="checkbox-wrapper">
        <label>
          <input type="checkbox" checked={check}
          onChange={() => setCheck((prev) => !prev)}/>
          <span>{label}</span>
          <p>{check ? "Sorted" : "Unsorted"}</p>
        </label>
      </div>
    );
  };


// component code adapted from: https://blog.logrocket.com/building-custom-checkbox-react/