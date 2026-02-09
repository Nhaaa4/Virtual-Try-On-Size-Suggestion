from pydantic import BaseModel, Field, field_validator
from enum import Enum
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from fastapi import UploadFile


class ModelType(str, Enum):
    DECISION_TREE = "decision_tree"
    NEURAL_NETWORK = "neural_network"


class PredictRequest(BaseModel):
    age: float = Field(..., gt=0, description="Age in years")
    height: float = Field(..., gt=0, description="Height in centimeters")
    weight: float = Field(..., gt=0, description="Weight in kilograms")
    model_type: ModelType = Field(
        default=ModelType.DECISION_TREE,
        description="Model to use for prediction: decision_tree or neural_network"
    )
    
    @field_validator("age", "height", "weight")
    @classmethod
    def validate_positive(cls, v):
        if v <= 0:
            raise ValueError("Value must be positive")
        return v


class GarmentCategory(str, Enum):
    UPPER_BODY = "Upper-body"
    LOWER_BODY = "Lower-body"
    DRESS = "Dress"

