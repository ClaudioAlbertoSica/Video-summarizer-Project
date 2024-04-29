import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';

import '../presentation/screen/create_account_screen.dart';

// GoRouter configuration
final appRouter = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => LoginScreen(),
      name: LoginScreen.name
    ),
    GoRoute(
      path: '/create-account-screen',
      builder: (context, state) => CreateAccountScreen(),
      name: CreateAccountScreen.name
    ),
    GoRoute(
      path: '/home-screen',
      builder: (context, state) => const HomeScreen(),
      name: HomeScreen.name
    ),
  ],
);
