"""Sum the values that meet or exceed a threshold."""


def filtered_sum(numbers: list[int], threshold: int) -> int:
    return sum(value for value in numbers if value >= threshold)


def main() -> None:
    numbers = [3, 8, 12, 5, 20]
    threshold = 10

    print("Filtered sum:")
    print(filtered_sum(numbers, threshold))


if __name__ == "__main__":
    main()
