from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event, RegisteredEvent, SubEvent
import json
from django.utils import timezone
from datetime import datetime

@csrf_exempt
def clear_database(request):
    try:
        Event.objects.all().delete()
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
            body_unicode = request.body.decode('utf-8').strip()
            if body_unicode:
                data = json.loads(body_unicode)
                print("Received data:", data)
                event_name = data.get('eventName', '')
                event_date = data.get('eventDate', '')
                end_event_date = data.get('EndEventDate', '')
                event_time_str = data.get('Time', '')
                event_endtime_str = data.get('EndTime', '')
                sub_events = data.get('subEvents', [])
                print("Extracted event name:", event_name)
                print("Extracted event date:", event_date)
                if event_name and event_date and end_event_date and event_time_str and event_endtime_str and sub_events:
                    event_time = datetime.strptime(event_time_str, '%H:%M')
                    event_endtime = datetime.strptime(event_endtime_str, '%H:%M')

                    main_event = Event.objects.create(name=event_name, date=event_date, another_date=end_event_date,
                                                    time=event_time, endtime=event_endtime)

                    for sub_event in sub_events:
                        if isinstance(sub_event, dict):  # Check if sub_event is a dictionary
                            sub_event_name = sub_event.get('name', '')
                            sub_event_duration = sub_event.get('duration', '')
                            if sub_event_name and sub_event_duration:
                                SubEvent.objects.create(name=sub_event_name, event=main_event, duration=sub_event_duration)
                            else:
                                return JsonResponse({'error': 'Invalid sub-event data'}, status=400)
                        else:
                            return JsonResponse({'error': 'Sub-event must be an object'}, status=400)

                    return JsonResponse({'message': 'Event created successfully'}, status=201)
                else:
                    return JsonResponse({'error': 'Invalid data'}, status=400)
            else:
                return JsonResponse({'error': 'Empty request body'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
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
            'date': event.date.strftime('%Y-%m-%d'),
            'endEventDate': event.another_date.strftime('%Y-%m-%d'),
            'startTime': event.time.strftime('%H:%M'),
            'end_Time': event.endtime.strftime('%H:%M'),
            'subEvents': [{'name': sub_event.name, 'duration': sub_event.duration} for sub_event in event.subevents.all()]
        }
        event_list.append(event_data)

    return JsonResponse(event_list, safe=False)

@csrf_exempt
def get_sub_events(request, event_name):
    try:
        event = Event.objects.get(name=event_name)
        sub_events = SubEvent.objects.filter(event=event)
        sub_event_list = [{'name': sub_event.name, 'duration': sub_event.duration} for sub_event in sub_events]
        return JsonResponse(sub_event_list, safe=False)
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
            sub_event_name = data.get('subEventName', '')
            event_name = data.get('eventName', '')

            if username and sub_event_name and event_name:
                RegisteredEvent.objects.create(username=username, sub_event_name=sub_event_name, event_name=event_name, time=timezone.now())
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
        registered_events = RegisteredEvent.objects.all()
        event_list = [{'id': event.id, 'username': event.username, 'subEventName': event.sub_event_name, 'eventName': event.event_name} for event in registered_events]
        return JsonResponse(event_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
