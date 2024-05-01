import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_book_button.dart';
import '../uicoreStyles/uicore_paragraph_style.dart';

class HomeScreen extends StatelessWidget {
  static const String name = 'HomeScreen';
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const AppTitleStyle(text:'David Og', color: Colors.white),
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
          image: AssetImage('assets/images/HomeDark.png'),
          fit: BoxFit.cover,
          ),
        ),
        child: Padding(
          padding: EdgeInsets.all(50.0),
          child: Column(
            children: [
              const SizedBox(
                height: 300,
                width: double.infinity,
              ),
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TitleStyle(text: 'Alicia se adentró en un mundo surrealista'),
                  SizedBox(height: 5,),
                  ParagraphStyle(text: 'Los gatos sonríen y las cartas de juego tienen vida propia. Entre tazas que hablan y orugas filosóficas.'),
                ],
              ),
              const SizedBox(height: 30,),
              //Boton donde iriamos
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {},
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
                    elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
                    overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
                    shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
                    shape:MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4.0), // Ajusta el radio de los bordes para hacerlos más redondeados
                        side: const BorderSide(color: Colors.blueGrey)
                      ), // Añade un borde para la sombra interior
                    ),
                  ),
                  child: const TitleStyle(text: 'aca iria algo no se que')
                ),
              ),
              const SizedBox(height: 20,),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  BookButton(),
                  BookButton(),
                ]
              ),
            ],
          ),
        ),
      ),
    );
  }
}
