from pathlib import Path
import sys

import pytest


LAB3_SRC = (
    Path(__file__).resolve().parents[1]
    / "Codex-modules"
    / "modules"
    / "module-02-prompt-engineering-for-code"
    / "labs"
    / "lab3-unit-test-generation"
    / "src"
)
sys.path.insert(0, str(LAB3_SRC))

from score_utils import calculate_final_score, is_eligible_for_reward


@pytest.mark.parametrize(
    ("base_score", "bonus_pct", "penalty", "expected"),
    [
        (100, 20, 5, 115.0),
        (48, 0, 0, 48.0),
        (12.5, 10, 1.25, 12.5),
    ],
)
def test_calculate_final_score_handles_typical_scoring_scenarios(
    base_score, bonus_pct, penalty, expected
):
    assert calculate_final_score(base_score, bonus_pct, penalty) == expected


def test_calculate_final_score_rounds_result_to_two_decimal_places():
    result = calculate_final_score(base_score=19.99, bonus_pct=12.5, penalty=0.33)

    assert result == 22.16
    assert isinstance(result, float)


def test_calculate_final_score_allows_negative_final_totals():
    assert calculate_final_score(base_score=5, bonus_pct=0, penalty=8) == -3.0


def test_calculate_final_score_supports_negative_bonus_percentage_as_reduction():
    result = calculate_final_score(base_score=80, bonus_pct=-10, penalty=5)

    assert result == 67.0


def test_calculate_final_score_handles_fractional_inputs_without_losing_precision():
    result = calculate_final_score(base_score=33.33, bonus_pct=7.5, penalty=1.11)

    assert result == 34.72


@pytest.mark.parametrize(
    ("score", "expected"),
    [
        (75.0, True),
        (75.01, True),
        (74.99, False),
    ],
)
def test_is_eligible_for_reward_uses_default_threshold_boundary(score, expected):
    assert is_eligible_for_reward(score) is expected


def test_is_eligible_for_reward_respects_custom_threshold():
    assert is_eligible_for_reward(score=60, threshold=60)
    assert not is_eligible_for_reward(score=59.99, threshold=60)


def test_is_eligible_for_reward_accepts_negative_thresholds_when_provided():
    assert is_eligible_for_reward(score=-2, threshold=-5)
    assert not is_eligible_for_reward(score=-6, threshold=-5)
