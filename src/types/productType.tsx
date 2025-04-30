export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];

}

// Response type from DummyJSON
export interface ProductsResponse {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}

// Response type for delete operation
export interface DeleteProductResponse {
  id: number;
  title: string;
  deleted: boolean;
  isDeleted: boolean;
}

export interface CategoriesType {
  name: string;
  slug: string;
  url: string;
}