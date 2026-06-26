import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState("");
	const [cursor, setCursor] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchProducts = async (loadMore = false) => {
		try {
			setLoading(true);

			let url = `${API_URL}/api/products?limit=20`;

			if (category) {
				url += `&category=${category}`;
			}

			if (loadMore && cursor) {
				url += `&cursorUpdatedAt=${cursor.updatedAt}`;
				url += `&cursorId=${cursor.id}`;
			}

			const res = await fetch(url);
			const data = await res.json();

			if (loadMore) {
				setProducts((prev) => [...prev, ...data.products]);
			} else {
				setProducts(data.products);
			}

			setCursor(data.nextCursor);
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setCursor(null);
		fetchProducts();
	}, [category]);

	return (
		<div className="min-h-screen bg-[#020617] text-white px-6 py-10">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-5xl md:text-6xl font-bold mb-4">
						CodeVector Product Browser
					</h1>

					<p className="text-gray-400 text-lg">
						200,000 Products • Cursor Pagination • MongoDB Atlas
					</p>
				</div>

				{/* Filter */}
				<div className="flex justify-center mb-8">
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="
              bg-gray-900
              border
              border-gray-700
              rounded-xl
              px-4
              py-2
              text-white
              focus:outline-none
              focus:border-blue-500
            "
					>
						<option value="">All Categories</option>
						<option value="Electronics">Electronics</option>
						<option value="Books">Books</option>
						<option value="Sports">Sports</option>
						<option value="Fashion">Fashion</option>
						<option value="Home">Home</option>
						<option value="Automotive">Automotive</option>
						<option value="Beauty">Beauty</option>
						<option value="Toys">Toys</option>
					</select>
				</div>

				{/* Product Count */}
				<div className="flex justify-center mb-8">
					<div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-medium">
						Showing {products.length} Products
					</div>
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>

				{/* Load More */}
				{cursor && (
					<div className="flex justify-center mt-12">
						<button
							onClick={() => fetchProducts(true)}
							disabled={loading}
							className="
                bg-blue-600
                hover:bg-blue-700
                px-8
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                disabled:opacity-50
              "
						>
							{loading ? "Loading..." : "Load More"}
						</button>
					</div>
				)}

				{/* Footer */}
				<div className="text-center text-gray-500 text-sm mt-14 pb-6">
					Built for CodeVector Labs Backend Challenge
				</div>
			</div>
		</div>
	);
}

export default App;
