package com.piechart;

import android.graphics.Color;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;

public class PieChartManager extends SimpleViewManager<PieChartView> {

  public static final String REACT_CLASS = "PieChart";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected PieChartView createViewInstance(ThemedReactContext reactContext) {
    return new PieChartView(reactContext);
  }

  @ReactProp(name = "data")
  public void setData(PieChartView view, @Nullable ReadableArray data) {
    ArrayList<PieChartSlice> slices = new ArrayList<>();

    for (int i = 0; i < data.size(); i++) {
      ReadableMap item = data.getMap(i);

      int color = item.getInt("color");
      float value = (float) item.getDouble("value");

      slices.add(new PieChartSlice(color, value));
    }

    view.slices = slices.toArray(new PieChartSlice[data.size()]);

    view.invalidate();
  }

  @ReactProp(name = "strokeWidth", defaultFloat = 0f)
  public void setStrokeWidth(PieChartView view, float strokeWidth) {
    view.strokeWidth = strokeWidth;

    view.invalidate();
  }

  @ReactProp(name = "strokeColor")
  public void setStrokeColor(PieChartView view, @Nullable String strokeColor) {
    view.strokeColor = Color.parseColor(strokeColor);

    view.invalidate();
  }

}
