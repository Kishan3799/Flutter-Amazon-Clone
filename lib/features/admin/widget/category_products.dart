

import 'package:amazon_clone/features/admin/models/sales.dart';
import 'package:fl_chart/fl_chart.dart' as charts;
import 'package:flutter/material.dart';


class CategoryProductsChart extends StatelessWidget {
   final List<Sales> salesData;
  const CategoryProductsChart({
    Key? key,
    required this.salesData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return charts.BarChart(
      charts.BarChartData(
        alignment: charts.BarChartAlignment.spaceAround,
        barGroups:  _createBarGroups(),
        titlesData:  charts.FlTitlesData(
          leftTitles: const charts.AxisTitles(
            sideTitles: charts.SideTitles(showTitles: true),
          ),
          bottomTitles: charts.AxisTitles(
            sideTitles: charts.SideTitles(
              showTitles: true,
              getTitlesWidget: (value,meta) {
                return Text(salesData[value.toInt()].label);
              },
            ),
          ),
        ),
        borderData: charts.FlBorderData(show: false),
        gridData: const charts.FlGridData(show: false),
        barTouchData: charts.BarTouchData(enabled: true),
      ),
    );
  }

  List<charts.BarChartGroupData> _createBarGroups() {
  return salesData 
        .asMap()
        .entries
        .map((entry) {
          final index = entry.key;
          final sales = entry.value;
          return charts.BarChartGroupData(
            x: index,
            barRods: [
              charts.BarChartRodData(
                toY: sales.earning.toDouble(),
                color: Colors.blue,
                width: 16,
              )
            ]
          );
        }).toList();
  }

}

