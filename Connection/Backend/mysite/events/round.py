import random

def create_round(players):
    num_players = len(players)
    round_matches = []

    if num_players % 2 == 0:
        for i in range(0, num_players, 2):
            match = (players[i], players[i + 1])
            round_matches.append(match)
    else:
        for i in range(0, num_players - 1, 2):
            match = (players[i], players[i + 1])
            round_matches.append(match)

        # Handle bye for odd number of players
        bye_player = players[-1]
        round_matches.append(("Bye", bye_player))

    return round_matches
def determine_round_winners(matches, winner_data):
    winners = []

    for match_num, match in enumerate(matches, start=1):
        if "Bye" in match:
            # Player with bye is automatically a winner
            winner = match[1]
        else:
            if f"match_{match_num}" in winner_data and winner_data[f"match_{match_num}"]:
                # If winner is provided and not empty, use it
                winner = winner_data[f"match_{match_num}"]
            else:
                # Choose a random winner from the match
                winner = random.choice(match)

        winners.append(winner)

    return winners
def tournament_schedule(num_players):
    players = [input(f"Enter name for Player {i + 1}: ") for i in range(num_players)]

    while len(players) > 1:
        round_matches = create_round(players[::-1])  # Reverse array before each round
        print("\nCurrent Round Matches:")
        for match_num, match in enumerate(round_matches, start=1):
            print(f"Match {match_num}: {match[0]} vs {match[1]}")

        winners = determine_round_winners(round_matches)

        # Eliminate players who lost in the current round
        players = winners

    print(f"\nCongratulations! {players[0]} is the final winner.")

if __name__ == "__main__":
    num_players = int(input("Enter the number of players: "))

    if num_players < 2:
        print("Error: Number of players should be at least 2.")
    else:
        tournament_schedule(num_players)
