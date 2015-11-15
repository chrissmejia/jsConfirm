from django.views.generic import ListView
from django.http import JsonResponse
# Create your views here.

'''
Index view.
'''
class FakeView(ListView):
    def post(self, request, *args, **kwargs):
        return JsonResponse({'status':'done'})