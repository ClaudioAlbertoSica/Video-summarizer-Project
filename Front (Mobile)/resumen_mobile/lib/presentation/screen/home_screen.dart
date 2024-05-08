import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/screen/form_text_screen.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_montain_backgound.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../../core/data/resume_datasource.dart';
import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_book_button.dart';
import '../uicoreStyles/uicore_paragraph_style.dart';

class HomeScreen extends StatelessWidget {
  static const String name = 'HomeScreen';
  final List<String> imageNames = ['home1.gif','home2.gif', 'home3.gif', 'home4.gif', 'home5.gif', 'home6.gif', 'home7.gif'];

  HomeScreen({super.key});
  String getRandomImage() {
    Random random = Random(); // Instancia de la clase Random
    int index = random.nextInt(imageNames.length); // Genera un número aleatorio
    return imageNames[index]; // Retorna el nombre de la imagen en el índice aleatorio
  }

  @override
  Widget build(BuildContext context) {
    String randomImage =  getRandomImage();
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const AppTitleStyle(text:'David Og', color: Colors.black),
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Stack(
        children: [
          Container(
            height: screenHeight * 0.4,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/$randomImage'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Positioned.fill(
            child: ClipPath(
              clipper: MountainClipperMediumFlat(),
              child: Container(
               color: Color.fromARGB(255, 255, 241, 241), // Cambia este color al color que desees para el fondo dentado
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              children: [
                SizedBox(
                  height: 250
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: resumenList.length,
                    itemBuilder: (context, index) {
                      final resumen = resumenList[index];
                      return Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: BookButton(resumen: resumen),
                      );
                    },
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        context.pushNamed(CoreFormVideo.name);
                      },
                      child: const Text('Botón 1'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        context.pushNamed(CoreFormText.name);
                      },
                      child: const Text('Botón 2'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      )
    );
  }
}
