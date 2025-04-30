import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./Components/Products/Products.js"
import ProductDetails from "./Components/Products/ProductDetails/ProductDetails.js";
import Navbar from "./Shared/Navbar/Navbar.js";
import ProductEditForm from "./Components/Products/ProductEditForm/ProductEditForm.js";

function App() {
  return (
    <div className="">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<ProductEditForm />} />
      </Routes>
    </div>
  );
}

export default App;
