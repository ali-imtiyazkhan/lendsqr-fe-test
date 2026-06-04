export default function FilterPanel() {
    const fields = ["Organization", "Username", "Email", "Date", "Phone Number", "Status"];
    return (
      <div className="filter-panel">
        {fields.map((field) => <label key={field}><span>{field}</span>{field === "Organization" || field === "Status" ? <select><option>Select</option></select> : <input placeholder={field === "Username" ? "User" : field} />}</label>)}
        <div className="filter-actions"><button className="reset">Reset</button><button className="filter">Filter</button></div>
      </div>
    );
  }