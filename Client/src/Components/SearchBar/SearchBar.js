import "./SearchBar.css";

function SearchBar({ getSearch }) {
    return (
        <div className="search">
            <h1> Recipe App </h1>
            <form className="search__searchForm">
                <input
                    className="search__input"
                    type="text"
                    placeholder="what are you searching for?"
                    onChange={(e) => getSearch(e.target.value)}
                    style={{ marginLeft: "20px" }}
                />
                <input
                    className="search__submit"
                    type="submit"
                    value="Search"
                />
                <select style={{ height: "35px", marginLeft: "10px" }}>
                    <option>gluten free</option>
                    <option>vegan</option>
                    <option>Vegeterian</option>
                    <option>Dairy free</option>
                </select>
            </form>
        </div>
    );
}

export default SearchBar;
