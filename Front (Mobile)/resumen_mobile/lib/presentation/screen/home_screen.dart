import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/screen/form_text_screen.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_montain_backgound.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../../core/data/resume_datasource.dart';
import '../../core/menu/drawer_menu.dart';
import '../providers/theme_provider.dart';
import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_book_button.dart';
import '../uicoreStyles/uicore_paragraph_style.dart';

class HomeScreen extends ConsumerWidget {
  static const String name = 'HomeScreen';
  final List<String> imageNames = ['home1.gif','home2.gif', 'home3.gif', 'home4.gif', 'home5.gif', 'home6.gif', 'home7.gif'];
  final List<String> imageDark = ['dome1.gif','dome2.gif', 'dome3.gif', 'dome4.gif', 'dome5.gif', 'dome6.gif', 'dome7.gif'];
  final TextEditingController searchValue = TextEditingController();

  HomeScreen({super.key});
  String getRandomImage(bool isDark) {
    Random random = Random(); // Instancia de la clase Random
    int index = random.nextInt(imageNames.length); // Genera un número aleatorio
    return isDark ? imageDark[index] : imageNames[index]; // Retorna el nombre de la imagen en el índice aleatorio
  }

  @override
  Widget build(BuildContext context,  WidgetRef ref) {
    final isDark = ref.watch(themeNotifierProvider).isDark;
    String randomImage =  getRandomImage(isDark);
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const AppTitleStyle(text: '', color: Colors.black),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        
      ),
      endDrawer: DrawerMenu(),
      body: StackLayout(
        screenHeight: screenHeight,
        backgroundImage: randomImage,
        backgroundColor: isDark ? Color.fromRGBO(30, 30, 30, 1) : Color.fromARGB(255, 255, 241, 241),
        content: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 25),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: searchValue,
                    onChanged: (value) {
                     
                  },
                    // Actualiza el texto de búsqueda
                //                searchText = value;
                    // Vuelve a construir el widget para actualizar la lista filtrada
                    //ref.refresh(this);
                  style: GoogleFonts.ubuntu(
                    fontWeight: FontWeight.w400
                  ),
                  decoration: InputDecoration(
                    hintText: 'Search resumen',
                    hintStyle:  GoogleFonts.ubuntu(
                      fontWeight: FontWeight.w100
                    ),
                    prefixIcon: Icon(Icons.book_outlined),
                    suffixIcon: IconButton(
                      icon: Icon(Icons.cancel),
                      onPressed: () {
                        searchValue.text = '';
                      },
                    ),
                    border: InputBorder.none,
                  ),
                ),
                Divider(),
              ],
            ),
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
      )
    );
  }
}
