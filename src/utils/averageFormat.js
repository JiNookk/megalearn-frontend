export default function averageFormat(ratings) {
  const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);

  return total / ratings.length;
}
