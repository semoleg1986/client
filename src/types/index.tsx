export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: {
      id: string;
      name: string;
    };
  }