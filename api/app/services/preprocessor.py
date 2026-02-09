import numpy as np
import pandas as pd
import joblib
from pathlib import Path
from typing import Dict, Tuple, Optional
from app.core.logging import get_logger

logger = get_logger(__name__)


class DataPreprocessor:
    
    def __init__(self):
        self.scaler = None
        self.training_data = None
        self.iqr_bounds = {}
        
    def load_stats_from_data(self, data_path: str = None, scaler_path: str = None):
        if data_path is None:
            data_path = "data/final_test.csv"
        
        if scaler_path is None:
            scaler_path = "models/feature_scaler.pkl"
        
        try:
            # Load training data for IQR calculations
            logger.info(f"Loading training data from {data_path}")
            df = pd.read_csv(data_path)
            
            # Handle missing values (same as notebook)
            df['age'] = df['age'].fillna(df['age'].median())
            df['height'] = df['height'].fillna(df['height'].median())
            df['weight'] = df['weight'].fillna(df['weight'].median())
            
            self.training_data = df[['age', 'height', 'weight']].copy()
            
            # Calculate IQR bounds for outlier detection
            self._calculate_iqr_bounds()
            
            logger.info(f"Loaded training data: {self.training_data.shape}")
            logger.info(f"IQR bounds calculated for outlier detection")
            
        except Exception as e:
            logger.warning(f"Could not load training data from {data_path}: {e}")
            logger.warning("IQR outlier detection will be disabled")
        
        # Load the saved StandardScaler
        try:
            scaler_path_obj = Path(scaler_path)
            if scaler_path_obj.exists():
                self.scaler = joblib.load(scaler_path_obj)
                logger.info(f"StandardScaler loaded from {scaler_path}")
                logger.debug(f"Scaler mean: {self.scaler.mean_}")
                logger.debug(f"Scaler scale: {self.scaler.scale_}")
            else:
                logger.error(f"StandardScaler not found at {scaler_path_obj.absolute()}")
                logger.warning("Normalization will not be applied!")
        except Exception as e:
            logger.error(f"Error loading StandardScaler: {e}")
            self.scaler = None
    
    def _calculate_iqr_bounds(self):
        """Calculate IQR bounds for outlier detection on raw data"""
        if self.training_data is None:
            return
        
        features = ['age', 'height', 'weight']
        for feature in features:
            Q1 = self.training_data[feature].quantile(0.25)
            Q3 = self.training_data[feature].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            self.iqr_bounds[feature] = {
                'lower': lower_bound,
                'upper': upper_bound,
                'Q1': Q1,
                'Q3': Q3,
                'IQR': IQR
            }
            
            logger.debug(f"{feature} IQR bounds: [{lower_bound:.2f}, {upper_bound:.2f}]")
    
    def check_outliers(self, age: float, height: float, weight: float) -> Dict[str, Dict]:
        outlier_status = {}
        input_values = {'age': age, 'height': height, 'weight': weight}
        
        for feature, value in input_values.items():
            if feature in self.iqr_bounds:
                bounds = self.iqr_bounds[feature]
                is_outlier = (value < bounds['lower']) or (value > bounds['upper'])
                
                outlier_status[feature] = {
                    'value': value,
                    'is_outlier': is_outlier,
                    'lower_bound': bounds['lower'],
                    'upper_bound': bounds['upper'],
                    'status': 'OUTLIER' if is_outlier else 'Normal'
                }
                
                if is_outlier:
                    logger.warning(
                        f"{feature} = {value:.2f} is an outlier "
                        f"(valid range: [{bounds['lower']:.2f}, {bounds['upper']:.2f}])"
                    )
            else:
                outlier_status[feature] = {
                    'value': value,
                    'is_outlier': False,
                    'status': 'Unknown (no bounds)'
                }
        
        return outlier_status
    
    def preprocess_input(self, age: float, height: float, weight: float) -> Tuple[pd.DataFrame, Dict]:

        input_data = pd.DataFrame({
            'age': [age],
            'height': [height],
            'weight': [weight]
        })
        
        logger.debug(f"Raw input: age={age}, height={height}, weight={weight}")
        
        # Check for outliers on RAW data (before normalization)
        outlier_info = self.check_outliers(age, height, weight)
        has_outliers = any(info['is_outlier'] for info in outlier_info.values())
        
        if has_outliers:
            logger.warning("Input contains outliers - prediction reliability may be affected")
        
        # Apply StandardScaler normalization
        if self.scaler is not None:
            standardized_data = pd.DataFrame(
                self.scaler.transform(input_data),
                columns=['age', 'height', 'weight']
            )
            logger.debug(f"Standardized input: {standardized_data.values[0]}")
        else:
            logger.warning("No scaler loaded - using raw input (predictions may be incorrect!)")
            standardized_data = input_data
        
        return standardized_data, outlier_info
    
    def postprocess_output(self, predicted_size: int) -> str:
        size_mapping = {
            1: "XXS",
            2: "S",
            3: "M",
            4: "L",
            5: "XL",
            6: "XXL",
            7: "XXXL"
        }
        
        return size_mapping.get(int(predicted_size), f"Size_{predicted_size}")
    
    def get_size_number(self, size_label: str) -> int:
        label_mapping = {
            "XXS": 1,
            "S": 2,
            "M": 3,
            "L": 4,
            "XL": 5,
            "XXL": 6,
            "XXXL": 7
        }
        
        return label_mapping.get(size_label.upper(), 3)
