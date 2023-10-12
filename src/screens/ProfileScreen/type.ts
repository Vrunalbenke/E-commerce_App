import { ReactNode } from react;

export type user_dataType = {
  id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  profile_pic: string | null;
  country_id: null;
  gender: string;
  phone_no: number;
  dob: number;
  is_active: true;
  created: number;
  modified: number;
  access_token: string;
};

export type product_categoriesType = {
  id: number;
  name: string;
  icon_image: string;
  created: number;
  modified: number;
};

export type UserDataType = {
  total_carts: number;
  total_orders: number;
};

export type AddressType = {
  streetAddress: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  place: string;
  index: number;
};


export type  OrderListType = {
    reduce: any;
    length: ReactNode;
    id:number;
    cost:number;
    created:number;
}

export type LoginDataType = {
    access_token: string;
     country_id: null; 
     created: number; 
     dob: number; 
     email: string;
     first_name: string;
     gender: string;
     id: number; 
     is_active: boolean; 
     last_name: string; 
     modified: number; 
     phone_no: number; 
     profile_pic: string;
     role_id: number; 
     username: string;
    }
