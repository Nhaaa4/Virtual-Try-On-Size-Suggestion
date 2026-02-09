#!/usr/bin/env python3
"""
Test script for the updated preprocessor with IQR and StandardScaler
"""

import sys
from pathlib import Path

# Add the app directory to the path
sys.path.insert(0, str(Path(__file__).parent))

from app.services.preprocessor import DataPreprocessor

def test_preprocessor():
    print("="*80)
    print("Testing DataPreprocessor with IQR and StandardScaler")
    print("="*80)
    
    # Initialize preprocessor
    preprocessor = DataPreprocessor()
    
    # Load data and scaler
    print("\n1. Loading training data and StandardScaler...")
    preprocessor.load_stats_from_data(
        data_path="data/final_test.csv",
        scaler_path="models/feature_scaler.pkl"
    )
    
    # Test cases
    test_cases = [
        {"age": 20, "height": 160, "weight": 50, "name": "Small person"},
        {"age": 25, "height": 170, "weight": 65, "name": "Medium person"},
        {"age": 30, "height": 185, "weight": 90, "name": "Large person"},
        {"age": 12, "height": 120, "weight": 75, "name": "Potential outlier (heavy child)"},
        {"age": 20, "height": 180, "weight": 45, "name": "Potential outlier (very light)"},
    ]
    
    print("\n2. Testing preprocessing with different inputs:")
    print("="*80)
    
    for i, case in enumerate(test_cases, 1):
        print(f"\n{'─'*80}")
        print(f"Test Case {i}: {case['name']}")
        print(f"{'─'*80}")
        print(f"Input: Age={case['age']}, Height={case['height']}, Weight={case['weight']}")
        
        # Preprocess
        standardized_data, outlier_info = preprocessor.preprocess_input(
            age=case['age'],
            height=case['height'],
            weight=case['weight']
        )
        
        # Display results
        print(f"\nOutlier Detection (IQR Method):")
        for feature, info in outlier_info.items():
            print(f"  {feature:8} = {info['value']:6.2f} | {info['status']}")
            if 'lower_bound' in info:
                print(f"           Valid range: [{info['lower_bound']:.2f}, {info['upper_bound']:.2f}]")
        
        print(f"\nStandardized Values:")
        for col in ['age', 'height', 'weight']:
            print(f"  {col:8} = {standardized_data[col].values[0]:7.3f}")
        
        has_outliers = any(info['is_outlier'] for info in outlier_info.values())
        if has_outliers:
            print(f"\n  ⚠️  WARNING: This input contains outliers!")
        else:
            print(f"\n  ✅ All values are within normal range")
    
    print("\n" + "="*80)
    print("✅ Preprocessor test completed!")
    print("="*80)
    
    # Test with missing scaler
    print("\n3. Testing without scaler (should warn):")
    preprocessor_no_scaler = DataPreprocessor()
    preprocessor_no_scaler.training_data = preprocessor.training_data
    preprocessor_no_scaler.iqr_bounds = preprocessor.iqr_bounds
    
    standardized_data, outlier_info = preprocessor_no_scaler.preprocess_input(
        age=25, height=170, weight=65
    )
    print("Should have shown a warning about missing scaler ☝️")
    
    print("\n" + "="*80)
    print("All tests completed!")
    print("="*80)


if __name__ == "__main__":
    test_preprocessor()
