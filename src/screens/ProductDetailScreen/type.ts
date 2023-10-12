export type ProductDetailType = {
    cost: number;
    created: number;
    description: string;
    id: number;
    modified: number;
    name: string;
    producer: string;
    product_category_id: number;
    product_images: [
      {
        created: number;
        id: number;
        image: string;
        modified: number;
        product_id: number;
      },
      
    ],
    rating: number;
    view_count: number;
  }