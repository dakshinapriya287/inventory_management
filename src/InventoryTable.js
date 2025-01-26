import React, { useState } from "react";

const InventoryTable = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item A", category: "Category 1", quantity: 20 },
    { id: 2, name: "Item B", category: "Category 2", quantity: 5 },
  ]);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const addItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) return;
    setItems([...items, { id: Date.now(), ...newItem, quantity: parseInt(newItem.quantity) }]);
    setNewItem({ name: "", category: "", quantity: "" });
  };

  const editItem = (id, updatedItem) => {
    setItems(items.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items
    .filter(item => item.category.includes(filter))
    .sort((a, b) => (sort === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity));

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSort("asc")}>Sort by Quantity Asc</button>
        <button onClick={() => setSort("desc")}>Sort by Quantity Desc</button>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} style={{ backgroundColor: item.quantity < 10 ? "red" : "white" }}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => editItem(item.id, { ...item, quantity: item.quantity + 1 })}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};

export default InventoryTable;
