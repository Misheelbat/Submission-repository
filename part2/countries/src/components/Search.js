export default function Search({name,setName}) {
  return (
    <div>
      <span>find countries </span>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
