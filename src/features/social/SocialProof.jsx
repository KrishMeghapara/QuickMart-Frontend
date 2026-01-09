import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Card,
  CardContent,
  Rating,
  Fade,
  Badge
} from '@mui/material';
import {
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  AccessTime as ClockIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

export default function SocialProof({ productId, productName, location = 'Rajkot' }) {
  const [socialData, setSocialData] = useState({
    ordersToday: 0,
    totalOrders: 0,
    avgRating: 0,
    recentBuyers: [],
    deliverySuccess: 0,
    lastOrderTime: ''
  });

  const [showLiveActivity, setShowLiveActivity] = useState(false);

  useEffect(() => {
    // Generate consistent social proof data based on product ID
    const seed = productId || 1;
    const ordersToday = ((seed * 17) % 50) + 15; // 15-65 orders today
    const totalOrders = ((seed * 23) % 500) + 100; // 100-600 total orders
    const avgRating = (((seed * 7) % 10) + 40) / 10; // 4.0-4.9 rating
    const deliverySuccess = ((seed * 11) % 8) + 92; // 92-99% success rate
    
    const buyerNames = [
      'Raj P.', 'Priya S.', 'Amit K.', 'Neha M.', 'Rohit T.', 'Kavya R.',
      'Vikram J.', 'Sneha L.', 'Arjun B.', 'Pooja G.', 'Kiran D.', 'Riya N.'
    ];
    
    const recentBuyers = Array.from({ length: 4 }, (_, i) => ({
      name: buyerNames[(seed + i) % buyerNames.length],
      time: `${((seed + i * 3) % 30) + 5} mins ago`,
      verified: (seed + i) % 3 === 0
    }));

    const lastOrderMinutes = ((seed * 13) % 15) + 2; // 2-17 minutes ago

    setSocialData({
      ordersToday,
      totalOrders,
      avgRating,
      recentBuyers,
      deliverySuccess,
      lastOrderTime: `${lastOrderMinutes} mins ago`
    });

    // Show live activity animation
    const timer = setTimeout(() => setShowLiveActivity(true), 1000);
    return () => clearTimeout(timer);
  }, [productId]);

  return (
    <Box sx={{ py: 3 }}>
      {/* Main Social Proof Stats */}
      <Card sx={{ 
        mb: 3, 
        border: '2px solid #10b981', 
        borderRadius: 3,
        bgcolor: 'rgba(16, 185, 129, 0.05)',
        position: 'relative',
        overflow: 'visible'
      }}>
        <Badge
          badgeContent="LIVE"
          sx={{
            position: 'absolute',
            top: -8,
            right: 16,
            '& .MuiBadge-badge': {
              bgcolor: '#ef4444',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.7rem',
              animation: 'pulse 2s infinite'
            }
          }}
        />
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingIcon sx={{ color: '#10b981', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
              🔥 Popular in {location}
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981' }}>
                {socialData.ordersToday}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>
                ordered today
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
                <Rating value={socialData.avgRating} precision={0.1} size="small" readOnly />
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>
                {socialData.avgRating.toFixed(1)} rating
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                {socialData.deliverySuccess}%
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>
                delivery success
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#3b82f6' }}>
                {socialData.totalOrders}+
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>
                total orders
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            p: 2, 
            bgcolor: 'rgba(16, 185, 129, 0.1)', 
            borderRadius: 2,
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <Typography sx={{ 
              color: '#10b981', 
              fontWeight: 600, 
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <ClockIcon sx={{ fontSize: 16, mr: 1 }} />
              Last ordered {socialData.lastOrderTime} • High demand item!
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Buyers Activity */}
      <Card sx={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: 3,
        mb: 3
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PeopleIcon sx={{ color: '#3b82f6', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
              👥 Recent Buyers
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {socialData.recentBuyers.map((buyer, index) => (
              <Fade in={showLiveActivity} timeout={500 + index * 200} key={index}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  p: 2,
                  bgcolor: index === 0 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(59, 130, 246, 0.05)',
                  borderRadius: 2,
                  border: `1px solid ${index === 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                  position: 'relative'
                }}>
                  {index === 0 && (
                    <Chip
                      label="Just now!"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: 8,
                        bgcolor: '#10b981',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  )}
                  <Avatar sx={{ 
                    bgcolor: index === 0 ? '#10b981' : '#3b82f6', 
                    width: 32, 
                    height: 32,
                    mr: 2,
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    {buyer.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem', mr: 1 }}>
                        {buyer.name}
                      </Typography>
                      {buyer.verified && (
                        <VerifiedIcon sx={{ fontSize: 14, color: '#10b981' }} />
                      )}
                    </Box>
                    <Typography sx={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      Ordered {productName?.split(' - ')[0] || 'this item'} • {buyer.time}
                    </Typography>
                  </Box>
                  <Chip
                    label="Delivered"
                    size="small"
                    sx={{
                      bgcolor: index === 0 ? '#10b981' : '#3b82f6',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
              </Fade>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Area Reviews */}
      <Card sx={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: 3
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarIcon sx={{ color: '#f59e0b', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
              ⭐ Reviews from {location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { name: 'Ravi K.', rating: 5, review: 'Super fast delivery! Got it in 10 minutes.', time: '2 days ago' },
              { name: 'Meera P.', rating: 5, review: 'Fresh quality, exactly as expected. Will order again.', time: '1 week ago' },
              { name: 'Suresh M.', rating: 4, review: 'Good product, delivery was quick as promised.', time: '2 weeks ago' }
            ].map((review, index) => (
              <Box key={index} sx={{ 
                p: 2,
                bgcolor: '#f9fafb',
                borderRadius: 2,
                border: '1px solid #e5e7eb'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ 
                    bgcolor: '#f59e0b', 
                    width: 28, 
                    height: 28,
                    mr: 1.5,
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    {review.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>
                      {review.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography sx={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {review.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '0.85rem', color: '#374151', fontStyle: 'italic' }}>
                  "{review.review}"
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}