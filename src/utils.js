export const getPosterUrl = (poster, fallbackUrl) => {
  return poster && poster !== 'N/A' ? poster : fallbackUrl;
};

export const calculateAverageRating = (ratings) => {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    console.warn('Ratings data is invalid or empty.');
    return 0;
  }

  // Helper function to convert ratings to a 0-10 scale
  const convertToOutOf10 = (rating) => {
    if (!rating) return 0;

    // IMDb: Exact match for /10
    if (rating.endsWith('/10')) {
      return parseFloat(rating.replace('/10', ''));
    }

    // Rotten Tomatoes: Exact match for %
    if (rating.endsWith('%')) {
      return parseFloat(rating.replace('%', '')) / 10;
    }

    // Metacritic: Exact match for /100
    if (rating.endsWith('/100')) {
      return parseFloat(rating.replace('/100', '')) / 10;
    }

    // Log unrecognized rating formats
    console.warn(`Unrecognized rating format: ${rating}`);
    return 0;
  };

  // Convert all ratings to out of 10 and calculate the average
  const total = ratings.reduce((sum, r) => sum + convertToOutOf10(r.Value), 0);

  // Calculate the average and ensure it is out of 10
  const average = total / ratings.length;

  // Return the average rounded to one decimal place (out of 10)
  return average.toFixed(1); // Rounded to 1 decimal place
};
