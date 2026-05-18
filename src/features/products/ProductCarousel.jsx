import React, { useRef } from 'react';
import { Chip, Button } from '@mui/material';
import './ProductCarousel.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useNavigate } from 'react-router-dom';

export default function ProductCarousel({ products, categoryName, onAddToCart, onSeeAll }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    const cardWidth = current.querySelector('.product-card')?.offsetWidth || 220;
    const scrollAmount = cardWidth * 2.5; 
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-section">
      <div className="category-header">
        <div>
          <h2 className="category-title">{categoryName}</h2>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Chip 
              label={`${products.length} items`} 
              size="small" 
              sx={{ 
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }} 
            />
          </div>
        </div>
        <button className="see-all-btn" onClick={onSeeAll}>see all <ArrowForwardIosIcon fontSize="small" /></button>
      </div>
      <div className="carousel-wrapper">
        <button className="carousel-arrow left" onClick={() => scroll('left')}><ArrowBackIosNewIcon /></button>
        <div className="carousel-row" ref={scrollRef}>
          {products.map(prod => (
            <div 
              className="product-card" 
              key={prod.productID}
              onClick={() => navigate(`/product/${prod.productID}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-badges">
                {/* Low Stock Badge — uses real API data */}
                {prod.stockQuantity != null && prod.stockQuantity > 0 && prod.stockQuantity <= 5 && (
                  <Chip 
                    label={`Only ${prod.stockQuantity} left`} 
                    size="small" 
                    sx={{ 
                      background: '#f59e0b',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: '20px',
                      borderRadius: '10px',
                      boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)'
                    }} 
                  />
                )}
              </div>
              <div className="product-img-wrapper">
                {prod.productImg && prod.productImg !== 'false' ? (
                  <img 
                    className="product-img" 
                    src={prod.productImg} 
                    alt={prod.productName}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                {(!prod.productImg || prod.productImg === 'false') && (
                  <div className="placeholder-icon">📦</div>
                )}
                <div style={{ display: 'none', fontSize: '3rem', color: '#d1d5db', opacity: 0.5 }}>📦</div>
              </div>
              <div className="product-meta">
                <div>
                  <div className="product-name">{prod.productName}</div>
                  <div className="product-qty" style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                    {prod.productQty || 'Fresh & Quality'}
                  </div>
                </div>
                <div className="product-price-row">
                  <div>
                    <span className="product-price">₹{prod.productPrice}</span>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prod);
                    }}
                    disabled={!prod.isInStock}
                    sx={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      px: 2,
                      py: 1,
                      minWidth: '80px',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
                      willChange: 'transform',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      },
                      '&:active': {
                        transform: 'scale(1.02)'
                      },
                      '&:disabled': {
                        bgcolor: '#cbd5e1',
                        color: '#94a3b8',
                        transform: 'none'
                      }
                    }}
                  >
                    ADD
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={() => scroll('right')}><ArrowForwardIosIcon /></button>
      </div>

    </div>
  );
} 