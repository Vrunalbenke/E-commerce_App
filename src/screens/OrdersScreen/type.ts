export type OrderDetailType = {
  address: string;
  cost: number;
  id: number;
  order_details: [
    {
      id: number;
      order_id: number;
      prod_cat_name: string;
      prod_image: string;
      prod_name: string;
      product_id: number;
      quantity: number;
      total: number;
    }
  ];
};
