import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
//COMENTO PORQUE AHORA NO USAMOS EL PROVIDER
//import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';


class FAQScreen extends ConsumerWidget {
  const FAQScreen({super.key});
  static const String name = 'FAQScreen';

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
      body: StackLayoutCustomized(
              screenHeight: screenHeight,
              colorLight: const Color.fromRGBO(235, 240, 241, 1), 
              colorDark: const Color.fromRGBO(30, 30, 30, 1) , 
              imageLigth:'FAQS.gif' , 
              imageDark:'FAQD.gif' , 
              content: [
                Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Column(
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Question Bla?',
                            style: GoogleFonts.ubuntu(
                              fontWeight: FontWeight.w700
                            ),
                          ),
                          const Text('Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las indus'),
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
            ],
      ),
    );
  }
}
