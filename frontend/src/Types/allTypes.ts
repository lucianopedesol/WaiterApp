
interface Ingredient {
  name: string;
  icon: string;
}

interface Category {
  _id?: string;
  icon: string;
  name: string;
  active: boolean;
}

interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  ingredients: Ingredient[];
  active: boolean;
  category: string;
  image: File | null;
  imagePath?: string | null;
}

