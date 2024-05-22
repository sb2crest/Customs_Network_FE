import { ProductCodeProvider } from "../../../context/ProductContext";
import UserProduct from "../UserProduct";

const ProductWrapper = () => {
  return (
    <ProductCodeProvider>
      <UserProduct />
    </ProductCodeProvider>
  );
};

export default ProductWrapper;
