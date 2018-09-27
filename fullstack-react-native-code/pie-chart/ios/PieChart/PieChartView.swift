//
//  PieChartView.swift
//  PieChart
//
//  Created by Devin Abbott on 6/24/18.
//  Copyright © 2018 Fullstack. All rights reserved.
//

import Foundation

class PieChartView: UIView {

  // MARK: - React

  override func didSetProps(_ changedProps: [String]!) {
    setNeedsDisplay()
  }

  // MARK: - Public

  @objc var strokeWidth: CGFloat = 0.0

  @objc var strokeColor: UIColor = .clear

  @objc var data: NSArray = [] {
    didSet {
      slices = data.map({ item in
        guard let object = item as? [String: Any],
          let value = object["value"] as? Double,
          let rawColor = object["color"]
          else {
            return PieChartSlice(color: .clear, value: 0)
        }

        return PieChartSlice(color: RCTConvert.uiColor(rawColor), value: value)
      })
    }
  }

  // MARK: - Private

  private struct PieChartSlice {
    let color: UIColor
    let value: Double
  }

  private var slices: [PieChartSlice] = []

  // MARK: - Drawing

  override func draw(_ rect: CGRect) {
    super.draw(rect)

    let center = CGPoint(x: bounds.width / 2, y: bounds.height / 2)
    let radius = (min(rect.size.width, rect.size.height) - strokeWidth) / 2

    let total = slices.map({ $0.value }).reduce(0, { $0 + $1 })

    guard total > 0 else { return }

    var value = 0.0

    let paths: [UIBezierPath] = slices.map({ slice in
      let path = UIBezierPath()
      path.move(to: center)
      path.addArc(
        withCenter: center,
        radius: radius,
        startAngle: CGFloat((value * 2 * Double.pi) - (Double.pi / 2)),
        endAngle: CGFloat(((value + (slice.value / total)) * 2 * Double.pi) - (Double.pi / 2)),
        clockwise: true)

      value += slice.value / total

      return path
    })

    paths.enumerated().forEach({ index, path in
      slices[index].color.setFill()
      path.fill()
    })

    paths.forEach({ path in
      strokeColor.setStroke()
      path.lineWidth = strokeWidth
      path.stroke()
    })
  }
}
