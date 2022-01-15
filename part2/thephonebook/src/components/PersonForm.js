export default function PersonForm({ ...props }) {
  const { newName, setNewName, newNumber, setNewNumber, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          type="number"
          required
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
