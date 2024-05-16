import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';

class LoadingScreen extends StatefulWidget {
  static const String name = 'loading_screen';

  const LoadingScreen({super.key});

  @override
  State<LoadingScreen> createState() => _LoadingScreenState();
}

class _LoadingScreenState extends State<LoadingScreen> {

@override
  void initState() {
    super.initState();
    // Llama a la función para iniciar el retraso de 5 segundos
    _navigateAfterDelay();
  }

  // Función para retrasar la navegación a la siguiente pantalla
  _navigateAfterDelay() {
    Future.delayed(const Duration(seconds: 3), () {
    context.goNamed(HomeScreen.name);
    });
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: LoadingView(imageLigth: 'loading2.gif', imageDark: 'loadingD.gif', text: 'Cambio de contraseña exitoso!',),
      
      
    );
  }
}

class LoadingView extends ConsumerWidget {
  final String imageLigth;
  final String imageDark;
  final String text;


  const LoadingView({
    super.key,
    required this.imageLigth,
    required this.imageDark,
    required this.text
  });

  

  @override
  Widget build(BuildContext context, ref) {
    final isDark = ref.watch(themeNotifierProvider).isDark;
    final String background = isDark ? imageDark : imageLigth;

    return Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.asset('assets/images/$background', 
                fit: BoxFit.cover)
              ),
                //const CircularProgressIndicator(backgroundColor: Colors.black38 ,),
                const SizedBox(height: 10,),
                Text(text),
              ],
            ) ),
    );
  }
}