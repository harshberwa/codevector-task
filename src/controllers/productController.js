const mongoose = require("mongoose");
const Product = require("../models/Product");

const getProducts = async (req, res) => {
	try {
		const limit = Math.min(parseInt(req.query.limit) || 20, 100);

		const { category, cursorUpdatedAt, cursorId } = req.query;

		let query = {};

		// Category Filter
		if (category) {
			query.category = category;
		}

		// Cursor Pagination
		if (cursorUpdatedAt && cursorId) {
			const cursorObjectId = new mongoose.Types.ObjectId(cursorId);

			query.$or = [
				{
					updatedAt: {
						$lt: new Date(cursorUpdatedAt),
					},
				},
				{
					updatedAt: new Date(cursorUpdatedAt),
					_id: {
						$lt: cursorObjectId,
					},
				},
			];
		}

		const products = await Product.find(query)
			.sort({
				updatedAt: -1,
				_id: -1,
			})
			.limit(limit);

		let nextCursor = null;

		if (products.length > 0) {
			const last = products[products.length - 1];

			nextCursor = {
				updatedAt: last.updatedAt,
				id: last._id,
			};
		}

		res.status(200).json({
			success: true,
			count: products.length,
			nextCursor,
			products,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	getProducts,
};
