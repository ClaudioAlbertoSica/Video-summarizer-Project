import 'package:flutter/material.dart';

final List<Color> colorList = [
  Colors.red.shade100,
  Colors.yellow.shade100,
  Colors.green.shade100,
  Colors.blue.shade100,
  Colors.black12
];


class AppTheme {
  final int selectedColor;
  final bool isDark;

  AppTheme({
    this.selectedColor = 0,
    this.isDark = false
  });

  ThemeData getTheme() {
    return ThemeData(
      colorSchemeSeed: colorList[selectedColor],
      brightness: isDark ? Brightness.dark : Brightness.light,
    );
  }

  AppTheme copyWith({int? selectedColor, bool?isDark}) {
    return AppTheme(
      selectedColor: selectedColor ?? this.selectedColor,
      isDark: isDark ?? this.isDark
    );
  }

}
