export default function Checkbox ({ label, value, onChange }) {
    return (
      <div className="checkbox-wrapper">
        <label>
        <input type="checkbox" onChange={onChange} checked={value}/>
        {label}
        </label>
      </div>
    );
  };

// component code adapted from: https://blog.logrocket.com/building-custom-checkbox-react/