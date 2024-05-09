import 'package:flutter/material.dart';
import 'package:resumen_mobile/core/app_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/entity/app_theme.dart';

final userProvider = StateProvider<String?>((ref) => null);


void main() {
  runApp(ProviderScope(
    child: MainApp(),
  ));
}

class MainApp extends StatelessWidget {
  MainApp({super.key});
  final theme = AppTheme(selectedColor: 0, isDark: false);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: appRouter,
      theme: theme.getTheme(),
    );
  }
}
