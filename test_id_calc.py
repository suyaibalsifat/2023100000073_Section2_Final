import pytest
from id_calc import sum_of_odds_from_id

def test_valid_id_sequence():
    assert sum_of_odds_from_id("2023100000073") == 81
    assert sum_of_odds_from_id("1234") == 25

def test_empty_or_spaced_input():
    assert sum_of_odds_from_id("") == 0
    assert sum_of_odds_from_id("       ") == 0
    assert sum_of_odds_from_id("\n\t  ") == 0

def test_invalid_characters():
    assert sum_of_odds_from_id("123a4") == 0
    assert sum_of_odds_from_id("221-001") == 0
    assert sum_of_odds_from_id("!@#") == 0