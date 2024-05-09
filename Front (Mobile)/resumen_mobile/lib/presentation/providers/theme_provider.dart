import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/app_theme.dart';

final Provider<List<Color>> colorListProvider = Provider((ref) => colorList);
final themeNotifierProvider = StateNotifierProvider<ThemeNotifier, AppTheme>((ref) => ThemeNotifier());

class ThemeNotifier extends StateNotifier<AppTheme> {
  ThemeNotifier() : super(AppTheme());

  void togleDarkMode() {
    state = state.copyWith(isDark : !state.isDark);
  }

  void changeColorTheme(int color) {
    state = state.copyWith(selectedColor: color);    
  }

}
