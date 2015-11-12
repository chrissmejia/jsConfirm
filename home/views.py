from django.views.generic import TemplateView

# Create your views here.

'''
Index view.
'''
class IndexView(TemplateView):
    template_name = "home/index.html"

'''
Gallery view.
'''
class GalleryView(TemplateView):
    template_name = "home/gallery.html"
