export interface IProduct {
  id: string;
  name: string;
  qty: number;
  price: number;
  photo: string;
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
  parent_id: string | null;
}
