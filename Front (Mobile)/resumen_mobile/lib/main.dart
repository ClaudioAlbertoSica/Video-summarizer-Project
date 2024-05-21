import 'package:flutter/material.dart';
import 'package:resumen_mobile/core/app_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';


void main() {
  runApp(const ProviderScope(
    child: MainApp(),
  ));
}

class MainApp extends ConsumerWidget {
  const MainApp({super.key});
  

  @override
  Widget build(BuildContext context, ref) {
    final user = ref.watch(userNotifierProvider);
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: appRouter,
      theme: user.getTheme(),
    );
  }
}
