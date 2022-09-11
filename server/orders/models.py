from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail

class Order(models.Model):
    name = models.CharField(max_length=20)
    phone = models.CharField(max_length=9)
    products = models.TextField()
    
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.id)
    
    class Meta:
        ordering = ('-id',)
        verbose_name = 'Orden'
        verbose_name_plural = 'Ordenes'

@receiver(post_save, sender=Order)
def save_profile(sender, instance, created, **kwargs):
    """ Order """
    order = instance
    if created:
        try:
            name = order.name
            phone = order.phone
            detail = order.products
            dest_email = "anaguillenmenacho4@gmail.com"
            message = f"{name} ordeno {detail}. su numero es: {phone}"
            src_email = "elnoobitaz@gmail.com"
            send_mail("Nueva Orden", message, src_email, [dest_email])
        except:
            pass
