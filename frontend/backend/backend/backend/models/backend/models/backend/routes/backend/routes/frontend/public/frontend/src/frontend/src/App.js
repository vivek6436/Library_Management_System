import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);

  const register = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/register", form);
    alert(res.data.message || res.data.error);
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      alert("Login success");
    } else {
      alert(res.data.error);
    }
  };

  const fetchBook = async () => {
    const res = await axios.get(`http://localhost:5000/api/books/fetch/${isbn}`);
    setBook(res.data);
  };

  const addBook = async () => {
    await axios.post("http://localhost:5000/api/books/add", book);
    alert("Book added");
  };

  const getBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login / Register</h2>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <br />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <br />

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>

      <hr />

      <h2>Books</h2>

      <input placeholder="Enter ISBN" onChange={(e) => setIsbn(e.target.value)} />
      <button onClick={fetchBook}>Fetch</button>

      {book && (
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <img src={book.image} alt="" />
          <br />
          <button onClick={addBook}>Add Book</button>
        </div>
      )}

      <hr />

      <button onClick={getBooks}>Show All Books</button>

      {books.map((b, i) => (
        <div key={i}>
          <h4>{b.title}</h4>
          <p>{b.author}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
