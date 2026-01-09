import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ProductFilter = ({ onFilterChange, categories }) => {
  const [filters, setFilters] = useState({
    categoryId: '',
    minPrice: '',
    maxPrice: '',
    inStockOnly: false,
    sortBy: 'name_asc'
  });
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 1000 });

  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        const range = await apiService.getPriceRange();
        setPriceRange(range);
        setFilters(prev => ({
          ...prev,
          minPrice: range.minPrice,
          maxPrice: range.maxPrice
        }));
      } catch (error) {
        console.error('Failed to fetch price range:', error);
      }
    };
    fetchPriceRange();
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      categoryId: '',
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
      inStockOnly: false,
      sortBy: 'name_asc'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="px-3 py-1 text-xs border border-white/30 rounded-lg text-white/80 hover:text-white hover:border-white/50 transition-all"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-white/90 mb-2">Category</label>
        <select
          value={filters.categoryId}
          onChange={(e) => handleFilterChange('categoryId', e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.categoryID} value={cat.categoryID} className="text-gray-900">
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-white/90 mb-3">
          Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}
        </label>
        <div className="px-2">
          <input
            type="range"
            min={priceRange.minPrice}
            max={priceRange.maxPrice}
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mb-3"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((filters.minPrice - priceRange.minPrice) / (priceRange.maxPrice - priceRange.minPrice)) * 100}%, rgba(255,255,255,0.2) ${((filters.minPrice - priceRange.minPrice) / (priceRange.maxPrice - priceRange.minPrice)) * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
          <input
            type="range"
            min={priceRange.minPrice}
            max={priceRange.maxPrice}
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) ${((filters.maxPrice - priceRange.minPrice) / (priceRange.maxPrice - priceRange.minPrice)) * 100}%, #06b6d4 ${((filters.maxPrice - priceRange.minPrice) / (priceRange.maxPrice - priceRange.minPrice)) * 100}%, #06b6d4 100%)`
            }}
          />
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="mb-8">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-white/90">In Stock Only</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-colors ${
              filters.inStockOnly ? 'bg-cyan-400' : 'bg-white/20'
            }`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                filters.inStockOnly ? 'translate-x-6' : 'translate-x-1'
              } mt-1`}></div>
            </div>
          </div>
        </label>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white/90 mb-3">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="name_asc" className="text-gray-900">Name A-Z</option>
          <option value="name_desc" className="text-gray-900">Name Z-A</option>
          <option value="price_asc" className="text-gray-900">Price Low-High</option>
          <option value="price_desc" className="text-gray-900">Price High-Low</option>
        </select>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default ProductFilter;