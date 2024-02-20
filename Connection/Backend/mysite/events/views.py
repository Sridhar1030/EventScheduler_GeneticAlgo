from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event, RegisteredEvent
import json
from django.utils import timezone
from datetime import datetime


@csrf_exempt
def clear_database(request):
    try:
        # Delete all records from the Event model
        Event.objects.all().delete()
        # Delete all records from the RegisteredEvent model
        RegisteredEvent.objects.all().delete()
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
            end_event_date = data.get('EndEventDate', '')
            event_time_str = data.get('Time', '')  # Get the Time from the request data
            event_endtime_str = data.get('EndTime', '')  # Get the EndTime from the request data

            if event_name and event_date and end_event_date and event_time_str and event_endtime_str:  
                # Parse the time strings and convert them into datetime objects
                event_time = datetime.strptime(event_time_str, '%H:%M')
                event_endtime = datetime.strptime(event_endtime_str, '%H:%M')

                Event.objects.create(name=event_name, date=event_date, another_date=end_event_date, time=event_time, endtime=event_endtime)  # Include the time and endtime in the creation of the Event object
                return JsonResponse({'message': 'Event created successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Invalid data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
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
            'another_date': event.another_date.strftime('%d-%m-%Y'),  # Format another_date field
            'Time': event.time.strftime('%I:%M %p') if event.time else '', # Format the time field if it exists
            'EndTime': event.endtime.strftime('%I:%M %p') if event.endtime else '' # Format the endtime field if it exists
        }
        for event in events
    ]
    return JsonResponse(event_list, safe=False)

@csrf_exempt
def register_event(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            username = data.get('username', '')
            event_name = data.get('event_name', '')
            
            if username and event_name.strip():
                # Create a new RegisteredEvent object with the provided data
                RegisteredEvent.objects.create(username=username, event_name=event_name, time=timezone.now())  # Set the time to the current time
                return JsonResponse({'message': 'Event registered successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Invalid data. Username and event name are required.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def get_registered_events(request):
    try:
        # Query all registered events
        registered_events = RegisteredEvent.objects.all()
        # Extract username and event name from registered events
        event_list = [{'id': event.id, 'username': event.username, 'event_name': event.event_name} for event in registered_events]
        return JsonResponse(event_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
