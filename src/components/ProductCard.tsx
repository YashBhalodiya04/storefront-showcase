import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Product } from '@/store/slices/productsSlice';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '@/hooks/useSnackbar';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useSnackbar();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={product.image}
        alt={product.title}
        sx={{
          objectFit: 'contain',
          p: 2,
          bgcolor: 'background.paper',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          label={product.category}
          size="small"
          sx={{ mb: 1, textTransform: 'capitalize' }}
          color="primary"
          variant="outlined"
        />
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3.6em',
          }}
        >
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ⭐ {product.rating.rate} ({product.rating.count})
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate(`/product/${product.id}`)}
          fullWidth
        >
          View
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
          fullWidth
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
