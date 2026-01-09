import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  History as HistoryIcon,
  TrendingUp as TrendingIcon,
  Clear as ClearIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

export default function EnhancedSearch({ onSearch, categories = [] }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const popularSearches = [
    { term: 'Milk', emoji: '🥛', time: '10 mins' },
    { term: 'Bread', emoji: '🍞', time: '12 mins' },
    { term: 'Eggs', emoji: '🥚', time: '15 mins' },
    { term: 'Bananas', emoji: '🍌', time: '12 mins' },
    { term: 'Onions', emoji: '🧅', time: '14 mins' },
    { term: 'Tomatoes', emoji: '🍅', time: '12 mins' }
  ];

  const quickCategories = [
    { name: 'Fruits & Vegetables', emoji: '🥬', time: '12-15 mins', color: '#10b981' },
    { name: 'Dairy & Eggs', emoji: '🥛', time: '10-12 mins', color: '#3b82f6' },
    { name: 'Snacks & Beverages', emoji: '🍿', time: '8-10 mins', color: '#f59e0b' },
    { name: 'Personal Care', emoji: '🧴', time: '15-18 mins', color: '#8b5cf6' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = categories
        .filter(cat => cat.categoryName.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, categories]);

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    console.log('EnhancedSearch: Searching for:', searchQuery);
    
    // Add to recent searches
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    // Update the query in the input field
    setQuery(searchQuery);
    
    // Close dropdown
    setShowSuggestions(false);
    
    // Call the parent's search handler
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 500 }}>
      <TextField
        ref={searchRef}
        fullWidth
        placeholder="Search for milk, bread, eggs, fruits..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setShowSuggestions(true)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            backgroundColor: 'white',
            border: '2px solid #10b981',
            '&:hover': {
              borderColor: '#059669',
            },
            '&.Mui-focused': {
              borderColor: '#10b981',
              boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
            }
          },
          '& .MuiInputBase-input': {
            paddingLeft: '48px',
            color: '#111827',
            fontSize: '16px',
          }
        }}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ 
              position: 'absolute', 
              left: 16, 
              color: '#10b981',
              zIndex: 1 
            }} />
          ),
          endAdornment: query && (
            <IconButton onClick={clearSearch} size="small">
              <ClearIcon sx={{ color: '#6B7280' }} />
            </IconButton>
          )
        }}
      />

      {showSuggestions && (
        <Paper 
          ref={dropdownRef}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid #e5e7eb',
            maxHeight: 400,
            overflow: 'auto'
          }}
        >
          {query.length === 0 && (
            <>
              <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: '#6B7280', fontWeight: 600 }}>
                🚀 Quick Categories
              </Typography>
              {quickCategories.map((category, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleSearch(category.name)}
                  sx={{ 
                    py: 1.5, 
                    '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.05)' },
                    borderLeft: `3px solid ${category.color}`
                  }}
                >
                  <ListItemIcon>
                    <Box sx={{ fontSize: '1.5rem' }}>{category.emoji}</Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.name}
                    secondary={`⚡ ${category.time}`}
                    sx={{ 
                      '& .MuiTypography-root': { color: '#111827', fontWeight: 600 },
                      '& .MuiTypography-body2': { color: '#10b981', fontWeight: 600, fontSize: '0.8rem' }
                    }}
                  />
                </ListItem>
              ))}
              <Divider />
            </>
          )}

          {query.length > 1 && suggestions.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: '#6B7280', fontWeight: 600 }}>
                📂 Categories
              </Typography>
              {suggestions.map((category) => (
                <ListItem
                  key={category.categoryID}
                  button
                  onClick={() => handleSearch(category.categoryName)}
                  sx={{ py: 1, '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.05)' } }}
                >
                  <ListItemIcon>
                    <CategoryIcon sx={{ color: '#10b981' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.categoryName}
                    secondary="⚡ 12-15 mins delivery"
                    sx={{ 
                      '& .MuiTypography-root': { color: '#111827' },
                      '& .MuiTypography-body2': { color: '#10b981', fontSize: '0.8rem' }
                    }}
                  />
                </ListItem>
              ))}
              <Divider />
            </>
          )}

          {recentSearches.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: '#6B7280', fontWeight: 600 }}>
                Recent Searches
              </Typography>
              {recentSearches.map((search, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleSearch(search)}
                  sx={{ py: 1, '&:hover': { backgroundColor: '#f3f4f6' } }}
                >
                  <ListItemIcon>
                    <HistoryIcon sx={{ color: '#6B7280' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={search}
                    sx={{ '& .MuiTypography-root': { color: '#111827' } }}
                  />
                </ListItem>
              ))}
              <Divider />
            </>
          )}

          <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: '#6B7280', fontWeight: 600 }}>
            🔥 Popular Right Now
          </Typography>
          <Box sx={{ p: 2, pt: 0 }}>
            {popularSearches.map((search, index) => (
              <Chip
                key={index}
                label={`${search.emoji} ${search.term}`}
                onClick={() => handleSearch(search.term)}
                sx={{
                  mr: 1,
                  mb: 1,
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#111827',
                  fontWeight: 600,
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                  }
                }}
              />
            ))}
          </Box>
          
          <Box sx={{ p: 2, pt: 0, borderTop: '1px solid #e5e7eb', bgcolor: 'rgba(16, 185, 129, 0.05)' }}>
            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              ⚡ All items delivered in 12-18 minutes
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}