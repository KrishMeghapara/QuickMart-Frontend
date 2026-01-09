import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Rating,
  Button,
  TextField,
  Paper,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../../components/common/ToastProvider';
import apiService from '../../services/apiService';
import { colors } from '../../theme/designTokens';

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, reviewText: '' });
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const data = await apiService.getProductReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview.rating || !newReview.reviewText.trim()) {
      showToast('Please provide both rating and review text', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await apiService.addProductReview({
        productID: productId,
        userID: user.UserID,
        rating: newReview.rating,
        reviewText: newReview.reviewText.trim()
      });
      
      showToast('Review submitted successfully!', 'success');
      setShowReviewDialog(false);
      setNewReview({ rating: 0, reviewText: '' });
      loadReviews();
    } catch (error) {
      showToast(error.response?.data || 'Failed to submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Customer Reviews
      </Typography>

      {/* Rating Summary */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 600, color: colors.primary[500] }}>
              {averageRating.toFixed(1)}
            </Typography>
            <Rating value={averageRating} readOnly precision={0.1} />
            <Typography variant="body2" color="text.secondary">
              {reviews.length} reviews
            </Typography>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            {ratingCounts.map((count, index) => (
              <Box key={5 - index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="body2" sx={{ minWidth: 20 }}>
                  {5 - index}
                </Typography>
                <Star sx={{ fontSize: 16, color: '#fbbf24' }} />
                <Box sx={{ 
                  flex: 1, 
                  height: 8, 
                  bgcolor: '#f3f4f6', 
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%`,
                    height: '100%',
                    bgcolor: colors.primary[500],
                    transition: 'width 0.3s ease'
                  }} />
                </Box>
                <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'right' }}>
                  {count}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {isAuthenticated && (
          <Button
            variant="contained"
            onClick={() => setShowReviewDialog(true)}
            sx={{ 
              bgcolor: colors.primary[500],
              '&:hover': { bgcolor: colors.primary[600] }
            }}
          >
            Write a Review
          </Button>
        )}
      </Paper>

      {/* Reviews List */}
      <Box sx={{ space: 2 }}>
        {reviews.map((review, index) => (
          <Paper key={review.reviewID} sx={{ p: 3, mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar sx={{ bgcolor: colors.primary[500] }}>
                {review.user?.firstName?.[0] || 'U'}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {review.user?.firstName || 'Anonymous'}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  {review.reviewText}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
        
        {reviews.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No reviews yet. Be the first to review this product!
            </Typography>
          </Box>
        )}
      </Box>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onClose={() => setShowReviewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Rating *
            </Typography>
            <Rating
              value={newReview.rating}
              onChange={(e, value) => setNewReview(prev => ({ ...prev, rating: value }))}
              size="large"
              sx={{ mb: 3 }}
            />
            
            <TextField
              label="Your Review *"
              multiline
              rows={4}
              fullWidth
              value={newReview.reviewText}
              onChange={(e) => setNewReview(prev => ({ ...prev, reviewText: e.target.value }))}
              placeholder="Share your experience with this product..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReviewDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            disabled={submitting}
            sx={{ bgcolor: colors.primary[500], '&:hover': { bgcolor: colors.primary[600] } }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}