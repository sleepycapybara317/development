export default function RadioButton ({ label, value, onChange }) {
    return (
      <label>
        <input type="radio" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  // component code adapted from https://www.robinwieruch.de/react-radio-button/