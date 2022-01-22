import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getFilteredItems();
  }, [products]);

  const url = "https://my-json-server.typicode.com/Ved-X/assignment/orders";

  function getData() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  function filterByStatus(event) {
    const filtered = products.filter((product) => {
      if (product.status === event.target.value) {
        return product;
      }
    });
    setFilteredProduct(filtered);
  }
  function getFilteredItems() {
    const filtered = products.filter((product) => {
      if (searchInput === "") {
        return product;
      } else if (
        product.customer.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return product;
      }
    });
    setFilteredProduct(filtered);
  }

  useEffect(() => {
    getFilteredItems();
  }, [searchInput]);

  function onSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  function sortProducts() {
    let sortedProducts = products.sort(function (a, b) {
      var keyA = new Date(a.date);
      var keyB = new Date(b.date);
      console.log(a.date, keyA);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    setFilteredProduct(sortedProducts);
  }

  function getTableRows() {
    let tableRows = filteredProduct.map((product) => (
      <tr>
        <td>{product.order_id}</td>
        <td>{product.customer}</td>
        <td>
          <p>{product.country}</p>
          <p className="desc">{product.address}</p>
        </td>
        <td>
          <p>{product.product_title}</p>
          <p className="desc">{product.product_description}</p>
        </td>
        <td>{product.date}</td>
        <td>
          <p className={product.status}>{product.status}</p>
        </td>
      </tr>
    ));
    return tableRows;
  }

  return (
    <div className="App">
      <div id="order">
        <p id="number">
          All Orders <i id="num">{filteredProduct.length}</i>
        </p>
      </div>
      <div id="searchbox">
        <input
          type="text"
          onChange={onSearchInputChange}
          value={searchInput}
          placeholder="Search Name"
        />{" "}
        <select onChange={filterByStatus} id="status">
          <option hidden>Filter</option>
          <option value="Delivered">Delivered</option>
          <option value="Completed">Completed</option>
          <option value="Prepared">Prepared</option>
          <option value="Prepone">Prepone</option>
        </select>
      </div>
      <table>
        <tr className="row">
          <th>ORDER ID</th>
          <th>CUSTOMER</th>
          <th>ADRESS</th>
          <th>PRODUCT</th>
          <th>
            <p onClick={sortProducts}>Date Order</p>
          </th>
          <th>STATUS</th>
        </tr>

        {getTableRows()}
      </table>
    </div>
  );
}
