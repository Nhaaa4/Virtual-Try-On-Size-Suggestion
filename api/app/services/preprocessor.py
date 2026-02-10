import pandas as pd
import joblib
from pathlib import Path
from typing import Tuple
from app.core.logging import get_logger

logger = get_logger(__name__)


class DataPreprocessor:
    
    def __init__(self):
        self.scaler = None
        
    def load_scaler(self, scaler_path: str = None):
        if scaler_path is None:
            scaler_path = "models/feature_scaler.pkl"
        
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
    
    def preprocess_input(self, age: float, height: float, weight: float) -> pd.DataFrame:

        input_data = pd.DataFrame({
            'age': [age],
            'height': [height],
            'weight': [weight]
        })
        
        logger.debug(f"Raw input: age={age}, height={height}, weight={weight}")
        
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
        
        return standardized_data
    
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
