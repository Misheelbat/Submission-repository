export default function Filter({ setSearch, search }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      filter shown with:
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
}
