const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const Product = require("../src/models/Product");

const categories = [
	"Electronics",
	"Fashion",
	"Books",
	"Home",
	"Sports",
	"Beauty",
	"Toys",
	"Automotive",
];

async function seedProducts() {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		console.log("MongoDB Connected");

		await Product.deleteMany({});

		const totalProducts = 200000;
		const batchSize = 5000;

		for (let i = 0; i < totalProducts; i += batchSize) {
			const products = [];

			for (let j = 0; j < batchSize; j++) {
				const createdAt = faker.date.past();

				products.push({
					name: faker.commerce.productName(),
					category:
						categories[
							Math.floor(Math.random() * categories.length)
						],
					price: Number(
						faker.commerce.price({
							min: 100,
							max: 10000,
						}),
					),
					createdAt,
					updatedAt: createdAt,
				});
			}

			await Product.insertMany(products);

			console.log(
				`${Math.min(i + batchSize, totalProducts)} products inserted`,
			);
		}

		console.log("200000 Products Seeded Successfully");

		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

seedProducts();
