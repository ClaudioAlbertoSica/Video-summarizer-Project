import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/providers/list_resumen_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_text_screen.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import '../../core/menu/drawer_menu.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_navigation_bar.dart';

class HomeScreen extends StatefulWidget {
  static const String name = 'HomeScreen';

  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 1; // Index for 'view_list' icon

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    if (index == 0) {
      context.pushNamed(CoreFormVideo.name);
    } else if (index == 0) {
      // Already on home screen, no action needed
    } else if (index == 2) {
      context.pushNamed(CoreFormText.name);
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        //title: const AppTitleStyle(text: '', color: Colors.black),
        //centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      endDrawer: const DrawerMenu(),
      body: _StackLayoutHome(screenHeight: screenHeight),
      bottomNavigationBar: UicoreNavigationBar(onTap: _onItemTapped, initialIndex: _selectedIndex),
    );
  }
}

// WIDGET STACKLAYOUT
class _StackLayoutHome extends ConsumerWidget {
  // ME TRAJE LAS LISTAS DE IMÁGENES
  final double screenHeight;
  final List<String> imageNames = ['home1.gif','home2.gif', 'home3.gif', 'home4.gif'];
  final List<String> imageDark = ['dome1.gif','dome1.gif', 'dome3.gif', 'dome4.gif'];

  _StackLayoutHome({
    super.key,
    required this.screenHeight
  });

  // MÉTODO PARA SELECCIONAR UNA IMÁGEN AL AZAR
  String getRandomImage(bool isDark) {
    Random random = Random(); // Instancia de la clase Random
    int index = random.nextInt(imageNames.length); // Genera un número aleatorio
    return isDark ? imageDark[index] : imageNames[index]; // Retorna el nombre de la imagen en el índice aleatorio
  }

  @override
  Widget build(BuildContext context, ref) {
    // PROVIDER PARA MANEJAR EL DARKMODE
    final isDark = ref.watch(userNotifierProvider).isDark;
    String randomImage =  getRandomImage(isDark);
    final resumenes = ref.watch(resumenNotifierProvider);
    return StackLayout(
      screenHeight: screenHeight,
      backgroundImage: randomImage,
      backgroundColor: isDark ? const Color.fromRGBO(30, 30, 30, 1) : const Color.fromARGB(255, 255, 241, 241),
      content: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 25),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _BarraSearch(),
              const Divider(),
            ],
          ),
        ),
        Expanded(
          child: resumenes.getResumenFound()
        ),
      ],
    );
  }
}

// WIDGET DE BARRA BUSCADORA CON SUS PROVIDERS Y CONTROLLERS
class _BarraSearch extends ConsumerWidget {

  /*const _BarraSearch({
    super.key,

  });*/

  @override
  Widget build(BuildContext context, ref) {
    // esta es la lista del datasource
    final resumenList = ref.watch(userNotifierProvider).inventario;
    // este es el provider
    final resumenProvider = ref.watch(resumenNotifierProvider.notifier);
    final TextEditingController searchValue = TextEditingController();

    return TextField(
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
        prefixIcon: const Icon(Icons.book_outlined),
        suffixIcon: IconButton(
          // ver de sacar si es que no hay nada escrito
          icon: const Icon(Icons.cancel),
          onPressed: () {
            searchValue.text = '';
            resumenProvider.changeList(resumenList);
          },
        ),
        border: InputBorder.none,
      ),
    );
  }
}
