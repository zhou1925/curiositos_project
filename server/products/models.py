import cloudinary
import cloudinary.uploader
import cloudinary.api
from django.db import models
from cloudinary.models import CloudinaryField


class ProductQuerySet(models.QuerySet):
    """
    custom Product queryset
    """
    def delete(self, *args, **kwargs):
        for obj in self:
            cloudinary.uploader.destroy(obj.image.public_id)
        super(ProductQuerySet, self).delete(*args, **kwargs)


class Product(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(blank=True, unique=True)
    active = models.BooleanField(default=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = CloudinaryField('image', folder = "shop-curiositos")
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    
    objects = ProductQuerySet.as_manager()

    @property
    def image_url(self):
        """ return image url """
        return self.image.url

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-created',)
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
