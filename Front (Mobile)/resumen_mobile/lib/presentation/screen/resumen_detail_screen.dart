import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
//COMENTO PORQUE AHORA NO USAMOS EL PROVIDER
//import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';


class ResumenDetailScreen extends ConsumerWidget {
  const ResumenDetailScreen({super.key});
  static const String name = 'ResumenDetailScreen';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    //COMENTO PORQUE AHORA NO LO USAMOS
    //final idUser = ref.watch(userProvider.notifier).state;
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Title HERE',
                    style: GoogleFonts.ubuntu(
                      fontSize: 24,
                      fontWeight: FontWeight.w700
                    ),
                  ),
                  const Divider(),
                  
                  Text('Question Bla2?',
                    style: GoogleFonts.ubuntu(
                      fontWeight: FontWeight.w700
                    ),
                  ),
                  const Text('Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las indus'),
                ],
              ),
            ],
          ),
      ),
    );
  }
}
