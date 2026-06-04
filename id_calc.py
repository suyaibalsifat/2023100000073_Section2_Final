def sum_of_odds_from_id(student_id):
    clean_id = str(student_id).replace(" ", "").replace("\t", "").replace("\n", "")
    
    if not clean_id or not clean_id.isdigit():
        return 0
        
    digit_sum = sum(int(digit) for digit in clean_id)
    
    total_odd_sum = 0
    for num in range(1, digit_sum + 1):
        if num % 2 != 0:
            total_odd_sum += num
            
    return total_odd_sum