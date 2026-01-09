import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Avatar,
  LinearProgress,
  Fade,
  Divider
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Restaurant as PrepareIcon,
  LocalShipping as ShippingIcon,
  Home as DeliveredIcon,
  AccessTime as ClockIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

export default function OrderTracking({ orderId, isDemo = false }) {
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState({
    orderId: '#QM12345',
    estimatedTime: 12,
    currentTime: 0,
    deliveryPartner: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      rating: 4.8,
      vehicle: 'Bike'
    },
    items: [
      { name: 'Milk - Amul Gold', quantity: 2, price: 130 },
      { name: 'Bread - Britannia', quantity: 1, price: 25 },
      { name: 'Eggs - Farm Fresh', quantity: 1, price: 84 }
    ],
    total: 239,
    address: 'University Road, Rajkot, Gujarat'
  });

  const steps = [
    {
      label: 'Order Confirmed',
      description: 'Your order has been confirmed and is being prepared',
      icon: <CartIcon />,
      time: '0 mins',
      status: 'completed'
    },
    {
      label: 'Preparing Order',
      description: 'Our team is carefully preparing your items',
      icon: <PrepareIcon />,
      time: '2-4 mins',
      status: activeStep >= 1 ? 'completed' : 'pending'
    },
    {
      label: 'Out for Delivery',
      description: 'Your order is on the way with our delivery partner',
      icon: <ShippingIcon />,
      time: '8-10 mins',
      status: activeStep >= 2 ? 'completed' : 'pending'
    },
    {
      label: 'Delivered',
      description: 'Order delivered successfully!',
      icon: <DeliveredIcon />,
      time: '12 mins',
      status: activeStep >= 3 ? 'completed' : 'pending'
    }
  ];

  useEffect(() => {
    if (!isDemo) return;

    // Simulate real-time progress
    const interval = setInterval(() => {
      setOrderData(prev => {
        const newTime = prev.currentTime + 1;
        let newStep = activeStep;
        
        if (newTime >= 2 && activeStep < 1) newStep = 1;
        if (newTime >= 6 && activeStep < 2) newStep = 2;
        if (newTime >= 12 && activeStep < 3) newStep = 3;
        
        if (newStep !== activeStep) {
          setActiveStep(newStep);
        }
        
        return { ...prev, currentTime: newTime };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeStep, isDemo]);

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'active': return '#f59e0b';
      default: return '#d1d5db';
    }
  };

  const progress = Math.min((orderData.currentTime / orderData.estimatedTime) * 100, 100);

  return (
    <Box sx={{ py: 3 }}>
      {/* Order Header */}
      <Card sx={{ 
        mb: 3, 
        border: '2px solid #10b981', 
        borderRadius: 3,
        bgcolor: 'rgba(16, 185, 129, 0.05)'
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
              🚚 Order {orderData.orderId}
            </Typography>
            <Chip
              label={activeStep === 3 ? 'DELIVERED' : 'IN PROGRESS'}
              sx={{
                bgcolor: activeStep === 3 ? '#10b981' : '#f59e0b',
                color: 'white',
                fontWeight: 600,
                animation: activeStep < 3 ? 'pulse 2s infinite' : 'none'
              }}
            />
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontWeight: 600, color: '#111827' }}>
                Delivery Progress
              </Typography>
              <Typography sx={{ fontWeight: 600, color: '#10b981' }}>
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#e5e7eb',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#10b981',
                  borderRadius: 4
                }
              }}
            />
            <Typography sx={{ fontSize: '0.8rem', color: '#6b7280', mt: 1 }}>
              Estimated delivery: {orderData.estimatedTime - orderData.currentTime} mins remaining
            </Typography>
          </Box>

          {/* Live Timer */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 2,
            bgcolor: 'rgba(16, 185, 129, 0.1)',
            borderRadius: 2,
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <ClockIcon sx={{ color: '#10b981', mr: 1 }} />
            <Typography sx={{ 
              color: '#10b981', 
              fontWeight: 700,
              fontSize: '1.1rem'
            }}>
              ⚡ Arriving in {Math.max(0, orderData.estimatedTime - orderData.currentTime)} minutes
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Order Steps */}
        <Card sx={{ border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 3 }}>
              📋 Order Status
            </Typography>

            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: getStepColor(step.status),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        {React.cloneElement(step.icon, { sx: { fontSize: 20 } })}
                      </Box>
                    )}
                  >
                    <Box sx={{ ml: 2 }}>
                      <Typography sx={{ fontWeight: 600, color: '#111827' }}>
                        {step.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        {step.time}
                      </Typography>
                    </Box>
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ color: '#6b7280', ml: 2, mb: 2 }}>
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        {/* Delivery Partner & Order Details */}
        <Box>
          {/* Delivery Partner */}
          {activeStep >= 2 && (
            <Fade in={true} timeout={500}>
              <Card sx={{ border: '1px solid #e5e7eb', borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
                    🏍️ Delivery Partner
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: '#3b82f6', 
                      width: 48, 
                      height: 48,
                      mr: 2,
                      fontWeight: 600
                    }}>
                      {orderData.deliveryPartner.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 600, color: '#111827' }}>
                        {orderData.deliveryPartner.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          ⭐ {orderData.deliveryPartner.rating}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          • {orderData.deliveryPartner.vehicle}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2,
                    bgcolor: '#f9fafb',
                    borderRadius: 2,
                    border: '1px solid #e5e7eb'
                  }}>
                    <PhoneIcon sx={{ color: '#3b82f6', mr: 1 }} />
                    <Typography sx={{ color: '#3b82f6', fontWeight: 600 }}>
                      {orderData.deliveryPartner.phone}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          )}

          {/* Order Summary */}
          <Card sx={{ border: '1px solid #e5e7eb', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
                📦 Order Summary
              </Typography>

              {orderData.items.map((item, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1
                }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: '#10b981' }}>
                    ₹{item.price}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontWeight: 700, color: '#111827' }}>
                  Total
                </Typography>
                <Typography sx={{ fontWeight: 700, color: '#10b981', fontSize: '1.1rem' }}>
                  ₹{orderData.total}
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                p: 2,
                bgcolor: 'rgba(16, 185, 129, 0.05)',
                borderRadius: 2,
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <LocationIcon sx={{ color: '#10b981', mr: 1 }} />
                <Typography sx={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  {orderData.address}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}