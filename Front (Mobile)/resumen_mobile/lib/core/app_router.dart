import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';

// GoRouter configuration
final appRouter = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => LoginScreen(),
      name: LoginScreen.name
    ),
  ],
);
