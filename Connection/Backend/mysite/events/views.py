from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event, RegisteredEvent,SubEvent
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
            sub_events = data.get('subEvents', [])  # Get the sub-events from the request data

            if event_name and event_date and end_event_date and event_time_str and event_endtime_str:
                # Parse the time strings and convert them into datetime objects
                event_time = datetime.strptime(event_time_str, '%H:%M')
                event_endtime = datetime.strptime(event_endtime_str, '%H:%M')

                # Create the main event
                main_event = Event.objects.create(name=event_name, date=event_date, another_date=end_event_date,
                                                time=event_time, endtime=event_endtime)

                # Create sub-events
                for sub_event_name in sub_events:
                    SubEvent.objects.create(name=sub_event_name, event=main_event)

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
        

@csrf_exempt    
def get_events(request):
    events = Event.objects.all()
    event_list = []

    for event in events:
        event_data = {
            'id': event.id,
            'name': event.name,
            'date': event.date.strftime('%d-%m-%Y'),
            'another_date': event.another_date.strftime('%d-%m-%Y'),
            'Time': event.time.strftime('%I:%M %p') if event.time else '',
            'EndTime': event.endtime.strftime('%I:%M %p') if event.endtime else '',
            'sub_events': [sub_event.name for sub_event in event.subevents.all()]
        }
        event_list.append(event_data)

    return JsonResponse(event_list, safe=False)

@csrf_exempt
def get_sub_events(request, event_name):
    try:
        # Retrieve the event object based on the provided event name
        event = Event.objects.get(name=event_name)
        # Retrieve all sub-events associated with the event
        sub_events = SubEvent.objects.filter(event=event)
        # Extract the names of sub-events
        sub_event_names = [sub_event.name for sub_event in sub_events]
        return JsonResponse(sub_event_names, safe=False)
    except Event.DoesNotExist:
        return JsonResponse({'error': 'Event does not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



@csrf_exempt
def register_event(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username', '')
            sub_event_name = data.get('subEventName', '')  # Updated to match the frontend field name
            event_name = data.get('eventName', '')  # Updated to match the frontend field name

            if username and sub_event_name.strip() and event_name:  # Ensure all required fields are provided
                # Create a new RegisteredEvent object with the provided data
                RegisteredEvent.objects.create(username=username, sub_event_name=sub_event_name, event_name=event_name, time=timezone.now())  # Set the time to the current time
                return JsonResponse({'message': 'Event registered successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Invalid data. Username, event name, and sub event name are required.'}, status=400)
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
        event_list = [{'id': event.id, 'username': event.username, 'sub_event_name': event.sub_event_name,'event_name':event.event_name} for event in registered_events]
        return JsonResponse(event_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
