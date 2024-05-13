import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/account_screeen.dart';
import 'package:resumen_mobile/presentation/screen/form_text_screen.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';
import '../presentation/screen/config_screen.dart';
import '../presentation/screen/create_account_screen.dart';
import '../presentation/screen/form_video_screen.dart';

// GoRouter configuration
final appRouter = GoRouter(
  initialLocation: '/',
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
      builder: (context, state) => HomeScreen(),
      name: HomeScreen.name
    ),
    GoRoute(
      path: '/resumen-video-form',
      builder: (context, state) => const CoreFormVideo(),
      name: CoreFormVideo.name
    ),
    GoRoute(
      path: '/resumen-text-form',
      builder: (context, state) => const CoreFormText(),
      name: CoreFormText.name
    ),
    GoRoute(
      path: '/config-screen',
      builder: (context, state) => const ConfigScreen(),
      name: ConfigScreen.name
    ),
    GoRoute(
      path: '/account-screen',
      builder: (context, state) => AcconutScreen(),
      name: AcconutScreen.name
    ),
  ],
);
