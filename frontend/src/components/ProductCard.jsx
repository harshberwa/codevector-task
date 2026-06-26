function ProductCard({ product }) {
	return (
		<div
			className="
      bg-gray-900
      border
      border-gray-800
      rounded-xl
      p-5
      transition-all
      duration-300
      hover:border-blue-500
      hover:shadow-lg
      hover:scale-[1.02]
    "
		>
			<h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
				{product.name}
			</h3>

			<span className="inline-block bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs mb-4">
				{product.category}
			</span>

			<p className="text-2xl font-bold text-green-400">
				₹ {Number(product.price).toFixed(2)}
			</p>

			<p className="text-gray-500 text-xs mt-4">
				Updated: {new Date(product.updatedAt).toLocaleDateString()}
			</p>
		</div>
	);
}

export default ProductCard;
