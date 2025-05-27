import type { Meta, StoryObj } from "@storybook/react";
import OrderItemCard from "../components/account/OrderItemCard";

const meta: Meta<typeof OrderItemCard> = {
  title: "Account/OrderItemCard",
  component: OrderItemCard,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof OrderItemCard>;

export const primary: Story = {
  args: {
    item: {
      id: "cmau3aekw0005i5u3u3p0gca9",
      orderId: "cmau3aekw0003i5u3e2u4lcb8",
      product: {
        __typename: "Product",
        id: "0f54dd34-2511-4b72-85de-7862bd04e800",
        name: "کلاه بیسبال نیویورک یانکیز",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        price: 300000,
        stock: 1000,
        brand: "نیویورک یانکیز",
        categoryId: "12",
        images: [
          "https://res.cloudinary.com/do4d27dp8/image/upload/v1743682656/image_3vfuppo5p.png",
          "https://res.cloudinary.com/do4d27dp8/image/upload/v1743682656/image_3vfuppo5p.png",
          "https://res.cloudinary.com/do4d27dp8/image/upload/v1743682656/image_3vfuppo5p.png",
          "https://res.cloudinary.com/do4d27dp8/image/upload/v1743682656/image_3vfuppo5p.png",
        ],
        sizes: ["M", "L"],
        colors: [],
        discount: 10,
        category: {
          id: "12",
          name: "اکسسوری",
        },
        comments: [],
        orderItems: [],
        discountCode: undefined,
        discountedPrice: 270000,
        createdAt: "2024-03-25T12:00:00.000Z",
        updatedAt: "2024-03-25T12:00:00.000Z",
      },
      color: "مشکی",
      size: "M",
      quantity: 1,
      priceAtPurchase: 300000,
      productId: "",
    },
  },
};
