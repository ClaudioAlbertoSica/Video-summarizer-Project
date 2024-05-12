import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/providers/list_resumen_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_text_screen.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_montain_backgound.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../../core/menu/drawer_menu.dart';
import '../../entity/resumen_list_search.dart';
import '../providers/theme_provider.dart';
import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_book_button.dart';

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
    //esta es la lista del datasource
    final resumenList = ref.watch(resumenListProvider);
    //este es el provider
    final resumenProvider = ref.watch(resumenNotifierProvider.notifier);
    final resumenes = ref.watch(resumenNotifierProvider);
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
                  onSubmitted: (value) {
                    List<ResumenPreview> searchFound = [];
                    for (var i = 0; i < resumenList.length; i++) {
                      if (resumenList[i].title.toLowerCase().contains(value.toLowerCase())) {
                        searchFound.add(resumenList[i]);
                      }
                    }
                    resumenProvider.changeList(searchFound);
//                    ref.read(resumenProvider).changeList(searchFound);
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
                      //ver de sacar si es que no hay nada escrito
                      icon: Icon(Icons.cancel),
                      onPressed: () {
                        searchValue.text = '';
                        resumenProvider.changeList(resumenList);
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
            child: resumenes.getResumenFound()//ResumenListSearch(resumenFound: resumenList).getResumenFound()
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
