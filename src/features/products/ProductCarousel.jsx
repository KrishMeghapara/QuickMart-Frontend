import React, { useRef } from 'react';
import { Chip } from '@mui/material';
import './ProductCarousel.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProductCarousel({ products, categoryName, onAddToCart, onSeeAll }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const getDeliveryTime = (product) => {
    // Generate consistent delivery time based on product ID
    const seed = product.productID || 1;
    const baseTime = 12;
    const variation = (seed * 7) % 6; // 0-5 mins variation, consistent per product
    return baseTime + variation;
  };

  const getStockLevel = (product) => {
    // Generate consistent stock level based on product ID
    const seed = product.productID || 1;
    return ((seed * 13) % 20) + 1; // 1-20, consistent per product
  };

  const isLowStock = (stockLevel) => stockLevel <= 5;
  const isPopular = (product) => {
    // Generate consistent popularity based on product ID
    const seed = product.productID || 1;
    return (seed * 11) % 10 < 3; // 30% chance, consistent per product
  };

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
            <Chip 
              icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
              label="12-18 mins" 
              size="small" 
              sx={{ 
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                fontWeight: 600,
                border: '1px solid rgba(16, 185, 129, 0.2)'
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
                {/* Delivery Time Badge */}
                <Chip 
                  icon={<AccessTimeIcon sx={{ fontSize: 12 }} />}
                  label={`${getDeliveryTime(prod)} mins`} 
                  size="small" 
                  sx={{ 
                    background: '#10b981',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    height: '22px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)',
                    '& .MuiChip-icon': {
                      marginLeft: '4px',
                      marginRight: '-2px'
                    }
                  }} 
                />
                
                {/* Urgency Indicators */}
                {isLowStock(getStockLevel(prod)) && (
                  <Chip 
                    icon={<WhatshotIcon sx={{ fontSize: 12 }} />}
                    label={`Only ${getStockLevel(prod)} left!`} 
                    size="small" 
                    sx={{ 
                      background: '#f59e0b',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: '20px',
                      borderRadius: '10px',
                      boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)',
                      animation: 'pulse 2s infinite',
                      '& .MuiChip-icon': {
                        marginLeft: '4px',
                        marginRight: '-2px'
                      }
                    }} 
                  />
                )}
                
                {isPopular(prod) && (
                  <Chip 
                    icon={<FlashOnIcon sx={{ fontSize: 12 }} />}
                    label="Popular" 
                    size="small" 
                    sx={{ 
                      background: '#ef4444',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: '20px',
                      borderRadius: '10px',
                      boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)',
                      '& .MuiChip-icon': {
                        marginLeft: '4px',
                        marginRight: '-2px'
                      }
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
                  <div className="product-delivery">
                    <FlashOnIcon sx={{ fontSize: 14, color: '#10b981', mr: 0.5 }} />
                    {getDeliveryTime(prod)} MINS
                  </div>
                  <div className="product-name">{prod.productName}</div>
                  <div className="product-qty" style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                    {prod.productQty || 'Fresh & Quality'}
                  </div>
                </div>
                <div className="product-price-row">
                  <div>
                    <span className="product-price">₹{prod.productPrice}</span>
                    {prod.productPrice > 150 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textDecoration: 'line-through', marginTop: '2px' }}>
                        ₹{Math.round(prod.productPrice * 1.2)}
                      </div>
                    )}
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