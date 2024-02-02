from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event
import json


def default_view(request):
    return HttpResponse("Welcome to the default view!")
@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        event_name = data.get('eventName', '')
        if event_name:
            Event.objects.create(name=event_name)
            return JsonResponse({'message': 'Event created successfully'}, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_events(request):
    events = Event.objects.all()
    event_list = [{'id': event.id, 'name': event.name} for event in events]
    return HttpResponse(json.dumps(event_list), content_type='application/json')
