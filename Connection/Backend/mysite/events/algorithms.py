import json
from datetime import datetime
import random

class Event:
    def __init__(self, name, duration, space_number, event_date, end_event_date):
        self.name = name
        self.duration = duration
        self.space_number = space_number
        self.event_date = event_date
        self.end_event_date = end_event_date
        self.start_time = None

class Schedule:
    def __init__(self, events):
        self.events = events
        self.fitness = None

    def calculate_fitness(self):
        self.fitness = 0
        
        # Sort events by duration in ascending order
        self.events.sort(key=lambda x: x.duration)

        # Initialize a dictionary to keep track of start times for each space number
        space_schedule = {}

        # Iterate through each event to calculate fitness and set start time
        for event in self.events:
            event.start_time = 10  # Set start time to 10:00 AM by default

            # Penalize if event starts before 10:00 AM
            if event.event_date.hour < 10:
                self.fitness -= 100

            # Check for conflicts with events in the same space
            if event.space_number in space_schedule:
                start_time = max(space_schedule[event.space_number], event.event_date.hour)
                event.start_time = start_time
                space_schedule[event.space_number] = start_time + event.duration
            else:
                space_schedule[event.space_number] = event.event_date.hour + event.duration

        # Return the calculated fitness
        return self.fitness


# Assuming the rest of the code remains unchanged


def generate_initial_population(population_size, events):
    population = []
    for _ in range(population_size):
        schedule = Schedule(events)
        random.shuffle(schedule.events)
        population.append(schedule)
    return population

def selection(population, tournament_size):
    selected_parents = []
    while len(selected_parents) < len(population):
        tournament = random.sample(population, tournament_size)
        # Filter out schedules with None fitness values
        valid_schedules = [schedule for schedule in tournament if schedule.fitness is not None]
        if valid_schedules:  # Check if there are any valid schedules
            winner = max(valid_schedules, key=lambda x: x.fitness)
            selected_parents.append(winner)
        else:
            break  # Break the loop if no valid schedules found
    return selected_parents

def crossover(parent1, parent2):
    # Select a random crossover point
    crossover_point = random.randint(0, min(len(parent1.events), len(parent2.events)) - 1)
    # Create children by combining parent events
    child1_events = parent1.events[:crossover_point] + parent2.events[crossover_point:]
    child2_events = parent2.events[:crossover_point] + parent1.events[crossover_point:]
    # Create child schedules
    child1 = Schedule(child1_events)
    child2 = Schedule(child2_events)
    return child1, child2

def mutation(schedule):
    # Select two random events to swap
    idx1, idx2 = random.sample(range(len(schedule.events)), 2)
    # Swap the events
    schedule.events[idx1], schedule.events[idx2] = schedule.events[idx2], schedule.events[idx1]

def genetic_algorithm(events, population_size, num_generations):
    population = generate_initial_population(population_size, events)
    best_schedule = None  # Initialize best_schedule variable
    best_fitness = float('-inf')  # Initialize best_fitness variable
    for generation in range(num_generations):
        # Print or log the current generation number
        print(f"Generation {generation + 1}/{num_generations}")

        # Selection
        tournament_size = 5  # Example value for tournament size, adjust as needed
        selected_parents = selection(population, tournament_size)

        # Crossover
        offspring = []
        for i in range(0, len(selected_parents), 2):
            parent1 = selected_parents[i]
            # Ensure there are enough selected parents for crossover
            if i + 1 < len(selected_parents):
                parent2 = selected_parents[i + 1]
                child1, child2 = crossover(parent1, parent2)
                offspring.extend([child1, child2])

        # Mutation
        for schedule in offspring:
            mutation(schedule)

        # Calculate fitness for each schedule in the population and offspring
        for schedule in population + offspring:
            schedule.calculate_fitness()

        # Survival selection
        population = population + offspring
        population.sort(key=lambda x: x.fitness if x.fitness is not None else float('-inf'), reverse=True)
        population = population[:population_size]

        # Update best_schedule if a better one is found
        if population[0].fitness is not None and population[0].fitness > best_fitness:
            best_schedule = population[0]
            best_fitness = best_schedule.fitness

    # Return the best schedule found after all generations
    return best_schedule

def calculate_total_days(start_date, end_date):
    # Calculate total days between two dates
    delta = end_date - start_date
    return delta.days

def load_events_from_json(json_data):
    events = []
    for event_data in json_data:
        event = Event(
            name=event_data["name"],
            duration=event_data["duration"],
            space_number=event_data["spaceNumber"],
            event_date=datetime.strptime(event_data["event_date"], "%Y-%m-%d"),
            end_event_date=datetime.strptime(event_data["end_event_date"], "%Y-%m-%d")
        )
        events.append(event)
    return events
