// Image optimization utility
export const optimizeImageUrl = (url, width = 300, height = 200, quality = 80) => {
  if (!url) return '/api/placeholder/300/200';
  
  // If it's already a placeholder or optimized URL, return as is
  if (url.includes('placeholder') || url.includes('w_')) return url;
  
  // For external URLs, return as is (could integrate with image CDN)
  if (url.startsWith('http')) return url;
  
  // For local images, add optimization parameters
  return `${url}?w=${width}&h=${height}&q=${quality}&fit=cover`;
};

// Lazy loading image component
export const LazyImage = ({ src, alt, width, height, className, ...props }) => {
  return (
    <img
      src={optimizeImageUrl(src, width, height)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ objectFit: 'cover', ...props.style }}
      {...props}
    />
  );
};