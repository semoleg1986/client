export interface IProduct {
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

export interface IOrder {
  id: string;
  receiptNumber: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  status: string;
  updateDate: string;
  orderitemSet: IOrderItem[];
}

export interface IOrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

export interface IAuthState {
  isAuthenticated: boolean;
  token: string | null;
  idSeller: string | null;
}

export interface IFormProps {
  updateProductList: () => void;
  handleEditProduct: (product: IProduct | null) => void;
  selectedProduct: IProduct | null;
}

export type TCardsProps = {
  products: IProduct[];
  updateProductList: () => void;
  onEditProduct: (product: IProduct) => void;
};

export type TCardProps = {
  product: IProduct;
  updateProductList: () => void;
  onEditProduct: (product: IProduct) => void;
};

export interface ILoginData {
  username: string;
  password: string;
}

export interface ILoginUserResponse {
  loginUser: {
    token: string;
    user: {
      sellerProfile: {
        id: string;
      };
    };
  };
}
