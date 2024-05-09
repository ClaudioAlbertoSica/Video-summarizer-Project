import 'package:flutter/material.dart';
import 'package:resumen_mobile/core/app_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';

final userProvider = StateProvider<String?>((ref) => null);


void main() {
  runApp(ProviderScope(
    child: MainApp(),
  ));
}

class MainApp extends ConsumerWidget {
  MainApp({super.key});
  

  @override
  Widget build(BuildContext context, ref) {
    final theme = ref.watch(themeNotifierProvider);
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: appRouter,
      theme: theme.getTheme(),
    );
  }
}
