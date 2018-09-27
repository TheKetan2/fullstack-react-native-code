package com.piechart;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.DisplayMetrics;
import android.view.View;

class PieChartSlice {

  public int color;

  public float value;

  public PieChartSlice(int color, float value) {
    this.color = color;
    this.value = value;
  }
}

public class PieChartView extends View {

  public float strokeWidth = 0;

  public int strokeColor = Color.TRANSPARENT;

  public PieChartSlice[] slices = new PieChartSlice[0];

  public PieChartView(Context context) {
    super(context);

    metrics = getResources().getDisplayMetrics();

    fill.setAntiAlias(true);
    fill.setDither(true);
    fill.setStyle(Paint.Style.FILL);

    stroke.setAntiAlias(true);
    stroke.setDither(true);
    stroke.setStyle(Paint.Style.STROKE);
  }

  private Paint fill = new Paint();
  private Paint stroke = new Paint();
  private DisplayMetrics metrics;

  @Override
  public void draw(Canvas canvas) {
    super.draw(canvas);

    float strokeWidth = this.strokeWidth * metrics.density;

    RectF rect = new RectF(0, 0, canvas.getWidth(), canvas.getHeight());
    rect.inset(strokeWidth / 2, strokeWidth / 2);

    float centerX = rect.centerX();
    float centerY = rect.centerY();

    float total = 0;

    for (PieChartSlice slice : slices) {
      total += slice.value;
    }

    if (total <= 0) {
      return;
    }

    float value = 0;

    for (PieChartSlice slice : slices) {
      fill.setColor(slice.color);

      Path path = new Path();
      path.moveTo(centerX, centerY);
      path.addArc(rect, (value * 360) - 90, (slice.value / total) * 360);
      path.lineTo(centerX, centerY);

      canvas.drawPath(path, fill);

      value += slice.value / total;
    }

    stroke.setStrokeWidth(strokeWidth);
    stroke.setColor(strokeColor);

    for (PieChartSlice slice : slices) {
      fill.setColor(slice.color);

      Path path = new Path();
      path.moveTo(centerX, centerY);
      path.addArc(rect, (value * 360) - 90, (slice.value / total) * 360);
      path.lineTo(centerX, centerY);

      canvas.drawPath(path, stroke);

      value += slice.value / total;
    }
  }
}
