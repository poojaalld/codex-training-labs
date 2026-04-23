"""Compute the average of odd numbers from a predefined list."""


def average_of_odd_numbers(numbers: list[int]) -> float | None:
    odd_numbers = [value for value in numbers if value % 2 == 1]
    if not odd_numbers:
        return None
    return sum(odd_numbers) / len(odd_numbers)


def main() -> None:
    numbers = [5, 2, 9, 1, 7, 4]
    average = average_of_odd_numbers(numbers)

    if average is None:
        print("No odd numbers.")
    else:
        print("Average odd number:")
        print(average)


if __name__ == "__main__":
    main()
