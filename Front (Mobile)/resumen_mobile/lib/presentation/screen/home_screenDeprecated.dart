import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_book_button.dart';
import '../uicoreStyles/uicore_paragraph_style.dart';
//PARA VER MÁS ADELANTE CUANDO SE TRABAJEN LOS ESTILOS
class HomeScreen extends StatelessWidget {
  static const String name = 'HomeScreen';
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      backgroundColor: ,
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
                  //BookButton(),
                  //BookButton(),
                ]
              ),
            ],
          ),
        ),
      ),
    );
  }
}






class HomeScreen extends ConsumerWidget {
  static const String name = 'HomeScreen';
  final List<String> imageNames = ['home1.gif','home2.gif', 'home3.gif', 'home4.gif', 'home5.gif', 'home6.gif', 'home7.gif'];
  final List<String> imageDark = ['dome1.gif','dome2.gif', 'dome3.gif', 'dome4.gif', 'dome5.gif', 'dome6.gif', 'dome7.gif'];

  HomeScreen({super.key});
  String getRandomImage(bool isDark) {
    Random random = Random(); // Instancia de la clase Random
    int index = random.nextInt(imageNames.length); // Genera un número aleatorio
    return isDark ? imageDark[index] : imageNames[index]; // Retorna el nombre de la imagen en el índice aleatorio
  }

  @override
  Widget build(BuildContext context,  WidgetRef ref) {
    final isDark = ref.watch(themeNotifierProvider).isDark;
    final colorTheme = ref.watch(themeNotifierProvider.notifier).getColor();
    String randomImage =  getRandomImage(isDark);
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const AppTitleStyle(text: '', color: Colors.black),
        centerTitle: true,
        backgroundColor: colorTheme,
      ),
      endDrawer: DrawerMenu(),
      body: Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              children: [
                Card(
                  clipBehavior: Clip.antiAlias,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(9.0), // Ajusta el radio de los bordes de la tarjeta
                  ),
                  shadowColor: Colors.black,
                  child: Image(image: AssetImage('assets/images/$randomImage'))
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
    );
  }
}
