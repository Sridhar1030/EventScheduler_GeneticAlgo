from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event
import json

@csrf_exempt
def clear_database(request):
    try:
        # Delete all records from your model
        Event.objects.all().delete()
        return JsonResponse({'message': 'Database cleared successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def default_view(request):
    return HttpResponse("Welcome to the default view!")

@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            event_name = data.get('eventName', '')
            event_date = data.get('eventDate', '')
            end_event_date = data.get('EndEventDate', '')  # Get the EndEventDate from the request data

            if event_name and event_date and end_event_date:  # Ensure all fields are provided
                Event.objects.create(name=event_name, date=event_date, another_date=end_event_date)
                return JsonResponse({'message': 'Event created successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Invalid data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            # Log the error for debugging purposes
            print(f"Error creating event: {str(e)}")
            return JsonResponse({'error': 'Internal Server Error'}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_events(request):
    events = Event.objects.all()
    event_list = [
        {
            'id': event.id,
            'name': event.name,
            'date': event.date.strftime('%d-%m-%Y'),
            'another_date': event.another_date.strftime('%d-%m-%Y')  # Format another_date field
        }
        for event in events
    ]
    return JsonResponse(event_list, safe=False)
