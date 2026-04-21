export default function SearchBar({ onSearch }: any) {
  return (
    <input
  placeholder="Search..."
  onChange={(e) => onSearch(e.target.value)}
  className="p-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded"
/>
  );
}