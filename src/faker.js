import { faker } from "@faker-js/faker";

export const generateAllProducts = (quantity) => {
    const products = [];
    for(let i=0; i<quantity ; i++){
        const product = generateOneProduct();
        products.push(product);
    }
    return products;
}

const generateOneProduct = () => {
    const product = {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.number.int({ min: 10000, max: 99999 }),
        price: faker.commerce.price({ min: 100, max: 15000, dec: 0 }),
        status: faker.datatype.boolean(),
        stock: faker.number.int({ min: 3, max: 100 }),
        category: faker.commerce.department(),
        sale: faker.datatype.boolean(),
        sale_percent: faker.number.int({ min: 10, max: 75 }),
        thumbnails: [ faker.image.urlLoremFlickr({ width: 450, height: 300 }), faker.image.urlLoremFlickr({ width: 450, height: 300 })]
    }
    return product;
}