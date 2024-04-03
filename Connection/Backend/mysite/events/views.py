from .algorithms import genetic_algorithm, load_events_from_json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Event, RegisteredEvent, SubEvent
import json
from django.utils import timezone
from datetime import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import RegisteredEvent


from django.http import JsonResponse
from .round import create_round, determine_round_winners
from .models import RegisteredEvent



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        
    ]


    return Response(routes)









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
                sub_events = data.get('subEvents', [])  # Extract sub_events from the data
                event_name = data.get('eventName', '')
                event_date = data.get('eventDate', '')
                end_event_date = data.get('endEventDate', '')
                event_time_str = data.get('Time', '')
                event_endtime_str = data.get('EndTime', '')
                if event_name and event_date and end_event_date and event_time_str and event_endtime_str and sub_events:
                    event_time = datetime.strptime(event_time_str, '%H:%M')
                    event_endtime = datetime.strptime(event_endtime_str, '%H:%M')

                    # Create the main event instance
                    main_event = Event.objects.create(name=event_name, date=event_date, another_date=end_event_date,
                                                    time=event_time, endtime=event_endtime)

                    # Create sub events
                    for sub_event in sub_events:
                        if isinstance(sub_event, dict):
                            sub_event_name = sub_event.get('name', '')
                            sub_event_duration = sub_event.get('duration', '')
                            space_number = sub_event.get('spaceNumber', '')  # Add spaceNumber field to subevent data
                            if sub_event_name and sub_event_duration and space_number:  # Check if space number is provided
                                SubEvent.objects.create(name=sub_event_name, event=main_event, duration=sub_event_duration, space_number=space_number)
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
            'subEvents': [{'name': sub_event.name, 'duration': sub_event.duration, 'spaceNumber': sub_event.space_number} for sub_event in event.subevents.all()]
        }
        event_list.append(event_data)

    return JsonResponse(event_list, safe=False)

@csrf_exempt
def get_sub_events(request, event_name):
    try:
        event = Event.objects.get(name=event_name)
        sub_events = SubEvent.objects.filter(event=event)
        sub_event_list = [{'name': sub_event.name, 'duration': sub_event.duration, 'spaceNumber': sub_event.space_number} for sub_event in sub_events]
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
            sub_event_name = data.get('subEventName', '')
            username = data.get('username', '')
            event_name = data.get('eventName', '')
            space_number = data.get('spaceNumber', '')

            if username and sub_event_name and event_name:
                # Retrieve the associated subevent
                sub_event = SubEvent.objects.get(name=sub_event_name, event__name=event_name)
                space_number = sub_event.space_number  # Retrieve the slot number
                RegisteredEvent.objects.create(username=username, sub_event_name=sub_event_name, event_name=event_name, space_number=space_number, time=timezone.now())  # Save space number along with other details
                return JsonResponse({'message': 'Event registered successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Invalid data. Username, event name, and sub event name are required.'}, status=400)
        except SubEvent.DoesNotExist:
            return JsonResponse({'error': 'Subevent does not exist'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def get_registered_events(request):    
    try:
        registered_events = RegisteredEvent.objects.all()
        event_list = []
        for event in registered_events:
            sub_event = SubEvent.objects.get(name=event.sub_event_name, event__name=event.event_name)
            event_data = {
                'id': event.id,
                'username': event.username,
                'subEventName': event.sub_event_name,
                'eventName': event.event_name,
                'spaceNumber': sub_event.space_number
            }
            event_list.append(event_data)
            print(event.username)

        return JsonResponse(event_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def run_genetic_algorithm(request):
    if request.method == 'POST':
        try:
            # Load events from JSON
            json_data = json.loads(request.body)
            events_data = json_data.get('events_data', [])
            
            # Ensure that at least one event is provided
            if not events_data:
                return JsonResponse({'error': 'At least one event must be provided'}, status=400)

            # Extract events from the events_data
            events = load_events_from_json(events_data)

            # Extract population size and number of generations
            population_size = int(json_data.get('population_size', 100))
            num_generations = int(json_data.get('num_generations', 100))

            # Run the genetic algorithm
            best_schedule = genetic_algorithm(events, population_size, num_generations)

            # Return the result
            if best_schedule:
                result = {
                    "best_schedule": {
                        "events": [event.__dict__ for event in best_schedule.events],
                        "fitness": best_schedule.fitness
                    }
                }
                return JsonResponse(result, status=200)
            else:
                return JsonResponse({"error": "No best schedule found."}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)




@csrf_exempt            
def tournament_schedule_view(request, event_name):
    if request.method == 'POST':
        try:
            # Decode the request body from bytes to a JSON string
            body_unicode = request.body.decode('utf-8')
            
            # Parse the JSON string to a Python dictionary
            request_data = json.loads(body_unicode)

            # Retrieve the list of registered events from the request data
            registered_events = request_data.get('registered_events', [])

            # Extract usernames from the registered events
            players = [event['username'] for event in registered_events]

            # Call the algorithm functions to schedule the tournament matches
            round_matches = create_round(players)
            winners = determine_round_winners(round_matches)

            # Return the tournament schedule with the winners
            return JsonResponse({'round_matches': round_matches, 'winners': winners}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)