export interface ProductWithCategories {
  id: string;
  name: string;
  qty: number;
  price: number;
  photo: string;
  categories: {
    id: string;
    name: string;
    parent_id: string | null;
  }[];
}
