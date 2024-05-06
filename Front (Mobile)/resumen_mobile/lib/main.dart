import 'package:flutter/material.dart';
import 'package:resumen_mobile/core/app_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final userProvider = StateProvider<String?>((ref) => null);

void main() {
  runApp(const ProviderScope(
    child: MainApp(),
  ));
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: appRouter,
    );
  }
}
