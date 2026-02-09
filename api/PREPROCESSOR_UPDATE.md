# Preprocessor Update: IQR + StandardScaler

## 📋 Summary of Changes

The preprocessor has been updated to match the approach used in the `size_suggestion_iqr_standardized.ipynb` notebook:

### ✅ **What Changed**

#### **OLD Approach (Z-Score per Size Category):**
- ❌ Per-size-category z-score normalization
- ❌ Data leakage (using test data statistics)
- ❌ Scale mismatch between training and prediction
- ❌ Clipping values to [-3, 3] range

#### **NEW Approach (IQR + StandardScaler):**
- ✅ **IQR (Interquartile Range)** for outlier detection on raw data
- ✅ **StandardScaler** for proper feature normalization
- ✅ **Global statistics** from training data only (no data leakage)
- ✅ **Consistent scaling** between training and prediction
- ✅ **Outlier warnings** without modifying input values

---

## 🔧 Files Modified

### 1. **`app/services/preprocessor.py`**

#### New Features:
- `load_stats_from_data()`: Now loads both training data (for IQR) and StandardScaler
- `_calculate_iqr_bounds()`: Calculates IQR bounds for outlier detection
- `check_outliers()`: Detects outliers using IQR method (Q1-1.5*IQR, Q3+1.5*IQR)
- `preprocess_input()`: Returns tuple of (standardized_data, outlier_info)

#### Key Changes:
```python
# OLD: Z-score normalization per size category
zscore = ((ndf - ndf.mean()) / ndf.std())

# NEW: IQR outlier detection + StandardScaler
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

standardized_data = scaler.transform(input_data)  # Using fitted StandardScaler
```

### 2. **`app/services/predictor.py`**

#### Updated:
- `predict()`: Now receives tuple (standardized_data, outlier_info) from preprocessor
- Logs warning if input contains outliers
- Uses standardized_data instead of input_data for predictions

### 3. **`app/services/model_loader.py`**

#### Updated:
- `load_model()`: Now loads StandardScaler from `models/feature_scaler.pkl`
- Initializes preprocessor with both training data and scaler
- Better error handling and logging

### 4. **`app/core/config.py`**

#### Added:
```python
FEATURE_SCALER_PATH: str = "models/feature_scaler.pkl"
```

---

## 📂 Required Files

Make sure these files exist in your `models/` directory:

```bash
models/
├── decision_tree_model_standardized.pkl  # Decision Tree trained on standardized data
├── mlp_model_standardized.pkl            # MLP trained on standardized data
└── feature_scaler.pkl                    # StandardScaler fitted on training data
```

If missing, copy from notebook:
```bash
cp notebooks/../models/feature_scaler.pkl models/
cp notebooks/../models/decision_tree_model_standardized.pkl models/
cp notebooks/../models/mlp_model_standardized.pkl models/
```

---

## 🧪 Testing

### Test the Preprocessor:
```bash
cd api
python test_preprocessor.py
```

### Test the API:
```bash
# Start the API
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Test with curl
curl -X 'POST' \
  'http://localhost:8000/api/size-suggestion/predict' \
  -H 'Content-Type: application/json' \
  -d '{
  "age": 25,
  "height": 170,
  "weight": 65,
  "model_type": "decision_tree"
}'
```

### Expected Behavior:
- ✅ Different inputs give different predictions
- ✅ Outlier warnings logged for unusual values
- ✅ Standardized values used for prediction
- ✅ Consistent results with notebook predictions

---

## 📊 Example Output

### Normal Input (No Outliers):
```
Input: Age=25, Height=170, Weight=65
Outlier Detection:
  age      =  25.00 | ✅ Normal
  height   = 170.00 | ✅ Normal
  weight   =  65.00 | ✅ Normal
Standardized: age=-0.234, height=0.012, weight=-0.156
Predicted Size: M (Confidence: 45.2%)
```

### With Outliers:
```
Input: Age=20, Height=180, Weight=45
Outlier Detection:
  age      =  20.00 | ✅ Normal
  height   = 180.00 | ✅ Normal
  weight   =  45.00 | ⚠️  OUTLIER (valid range: [48.50, 92.30])
⚠️  WARNING: Input contains outliers - prediction may be less reliable
Standardized: age=-0.456, height=0.789, weight=-1.234
Predicted Size: S (Confidence: 38.5%)
```

---

## 🔍 Verification Checklist

- [ ] `feature_scaler.pkl` exists in `models/` directory
- [ ] Updated model files (`*_standardized.pkl`) exist
- [ ] `.env` file has `FEATURE_SCALER_PATH=models/feature_scaler.pkl`
- [ ] API starts without errors
- [ ] Test predictions with different inputs give different results
- [ ] Outlier warnings appear for unusual inputs
- [ ] Predictions match notebook results (±1-2% confidence difference is OK)

---

## 🚀 Benefits

1. **No Data Leakage**: Scaler fitted only on training data
2. **Consistent Scaling**: Same normalization for training and prediction
3. **Better Accuracy**: Preserves inter-category size differences
4. **Transparency**: Clear outlier warnings
5. **Production Ready**: Saved scaler can be versioned and deployed

---

## 🐛 Troubleshooting

### Problem: "No scaler loaded"
**Solution**: Make sure `feature_scaler.pkl` exists and path is correct in `.env`

### Problem: All predictions are the same
**Solution**: 
1. Check if scaler is loading correctly
2. Verify models are the `*_standardized.pkl` versions
3. Check Decision Tree depth (should be > 5)

### Problem: Predictions don't match notebook
**Solution**: 
1. Verify same scaler is being used
2. Check column order (age, height, weight)
3. Ensure raw input (not normalized) is checked for outliers

---

**Last Updated**: February 9, 2026
**Version**: 1.4.0
