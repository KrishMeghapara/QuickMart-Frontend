import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  Fade
} from '@mui/material';
import {
  FlashOn as FlashIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Simple emoji map for category display
const categoryEmojis = {
  'fruits': '🍎', 'vegetables': '🥬', 'dairy': '🥛', 'bakery': '🍞',
  'snacks': '🍿', 'beverages': '🥤', 'meat': '🥩', 'seafood': '🦐',
  'frozen': '🧊', 'pantry': '🥫', 'household': '🧽', 'personal care': '🧴',
  'baby': '🍼'
};

const categoryColors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];

function getCategoryEmoji(name) {
  if (!name) return '📦';
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(categoryEmojis)) {
    if (lower.includes(key)) return emoji;
  }
  return '📦';
}

export default function SmartCategoryNav({ categories = [] }) {
  const navigate = useNavigate();

  if (categories.length === 0) return null;

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: '#111827',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          🛒 Shop by Category
        </Typography>
        <Chip
          label="Quick delivery"
          icon={<FlashIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: '#10b981',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.9rem',
            px: 1
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {categories.map((category, index) => {
          const color = categoryColors[index % categoryColors.length];
          const emoji = getCategoryEmoji(category.categoryName);

          return (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={category.categoryID}>
              <Fade in={true} timeout={300 + index * 100}>
                <Card
                  onClick={() => navigate(`/category/${category.categoryID}`)}
                  sx={{
                    cursor: 'pointer',
                    border: `2px solid ${color}20`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 32px ${color}30`,
                      borderColor: color,
                    }
                  }}
                >
                  <CardContent sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    bgcolor: `${color}10`,
                    '&:last-child': { pb: 3 }
                  }}>
                    <Box sx={{ fontSize: '3rem', mb: 2, lineHeight: 1 }}>
                      {emoji}
                    </Box>
                    
                    <Typography sx={{ 
                      fontWeight: 700, 
                      fontSize: '1rem',
                      color: '#111827',
                      mb: 1,
                      lineHeight: 1.2
                    }}>
                      {category.categoryName}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}