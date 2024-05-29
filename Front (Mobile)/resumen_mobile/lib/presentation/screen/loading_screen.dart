import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';

class LoadingScreen extends StatefulWidget {
  static const String name = 'loading_screen';
  final String text;
  const LoadingScreen({super.key, required this.text});

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
    return Scaffold(
      body: LoadingView(imageLigth: 'loading2.gif', imageDark: 'loadingD.gif', text: widget.text),
      
      
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
    final screenHeight = MediaQuery.of(context).size.height;

    return StackLayoutCustomized(
              screenHeight: screenHeight,
              colorLight: const Color.fromRGBO(235, 240, 241, 1), 
              colorDark: const Color.fromRGBO(30, 30, 30, 1) , 
              imageLigth:imageLigth , 
              imageDark:imageDark , 
              content: [
                const SizedBox(height: 10,),
                Text(text,
                style: GoogleFonts.ubuntu(fontSize: 24, fontWeight: FontWeight.w700)),
              ],
          );
  }
}