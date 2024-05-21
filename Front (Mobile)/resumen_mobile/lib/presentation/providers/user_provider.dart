import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/user.dart';

final userNotifierProvider = StateNotifierProvider<ThemeNotifier, User>((ref) => ThemeNotifier());

class ThemeNotifier extends StateNotifier<User> {
  ThemeNotifier() : super(User());

  void togleDarkMode(bool isDark) {
    state = state.copyWith(isDark : isDark);
  }

  void setUserLogin(User userLog){
    state = state.copyWith(userLog: userLog);
  }
}
