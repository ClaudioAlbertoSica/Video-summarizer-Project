import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/entity/user.dart';

//final userLogueadoProvider = StateProvider<User?>((ref) => null);
final userProvider = StateProvider<String?>((ref) => null);
/*final userDarkModeProvider = StateProvider<bool?>((ref) => false);
final userListSummaryProvider = StateProvider<List<ResumenPreview>>((ref)=>[]);*/
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