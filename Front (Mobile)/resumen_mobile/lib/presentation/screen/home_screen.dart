import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:resumen_mobile/core/service/server.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/presentation/providers/list_resumen_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_text_screen.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/loading_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_skeleton_resume.dart';
import '../../core/menu/drawer_menu.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_navigation_bar.dart';

class HomeScreen extends ConsumerStatefulWidget {
  static const String name = 'HomeScreen';

  const HomeScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen>{
  Timer? _timer;
  @override
  void initState() {
    super.initState();
    if(ref.read(userNotifierProvider).inProgress){
      _startCheckingProgress();
    }
  }
//Consultamos constantemente al servidor si hay un resumen en progreso
  void _startCheckingProgress() {
    final idUser = ref.read(userNotifierProvider).id;

    _timer = Timer.periodic(const Duration(seconds: 7), (timer) async {
      await Server.isInProgress(idUser, ref);
      if (!ref.read(userNotifierProvider).inProgress) {
        _timer?.cancel();
    }
  });
  }


@override
  void dispose() {
    _timer?.cancel(); 
    super.dispose();
  }


  String errorMessage = '';
  int _selectedIndex = 1; // Index for 'view_list' icon

  @override
  Widget build(BuildContext context) {
    final isDark = ref.watch(userNotifierProvider).isDark;
    final screenHeight = MediaQuery.of(context).size.height;
    
    return Scaffold(
      resizeToAvoidBottomInset: true,
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        //title: const AppTitleStyle(text: '', color: Colors.black),
        //centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      endDrawer: const DrawerMenu(),
      body: _StackLayoutHome(screenHeight: screenHeight),
      bottomNavigationBar: UicoreNavigationBar(
        onTap: _onItemTapped, 
        initialIndex: _selectedIndex, 
        color: const Color.fromRGBO(252, 242, 218, 1),
        isDark: isDark,
      ),
    );
  }

  Future<void> _onItemTapped(int index) async {
    final idUser = ref.watch(userNotifierProvider).id;
    final bool inProgress= await Server.isInProgress(idUser, ref);
    setState(() {
      _selectedIndex = index;
    });
    if (index == 0) {
      if(!inProgress){
        context.goNamed(CoreFormVideo.name);
      }else{
        context.goNamed(LoadingScreen.name, extra: 'Seguimos trabajando en tu resumen! Por favor espera unos minutos...');
      }
      // Already on home screen, no action needed
    } else if (index == 2) {
      if(!inProgress){
        context.goNamed(CoreFormText.name);
      }else{
        context.goNamed(LoadingScreen.name, extra: 'Seguimos trabajando en tu resumen! Por favor espera unos minutos...');
      }
    }
  }
}

// WIDGET STACKLAYOUT
class _StackLayoutHome extends ConsumerWidget {
  // ME TRAJE LAS LISTAS DE IMÁGENES
  final double screenHeight;

  _StackLayoutHome({
    super.key,
    required this.screenHeight
  });

  @override
  Widget build(BuildContext context, ref) {
    // PROVIDER PARA MANEJAR EL DARKMODE
    final resumenes = ref.watch(resumenNotifierProvider);
    final inProgress = ref.watch(userNotifierProvider).inProgress;
    return StackLayoutCustomized(
      keyboardHeight: MediaQuery.of(context).viewInsets.bottom,
      screenHeight: screenHeight,
      colorLight: const Color.fromRGBO(252, 242, 218, 1), 
      colorDark: const Color.fromRGBO(30, 30, 30, 1) , 
      imageLigth:'home1.gif' , 
      imageDark:'dome1.gif' , 
      content: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _BarraSearch(),
              const Divider(),
              inProgress ? const SkeletonResume() : const SizedBox(height: 0,),
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
    final resumenList = ref.read(userNotifierProvider).inventario;
    // este es el provider
    final resumenProvider = ref.read(resumenNotifierProvider.notifier);
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
      },
      style: GoogleFonts.ubuntu(
          fontWeight: FontWeight.w400
      ),
      decoration: InputDecoration(
        hintText: 'Buscar resumenes',
        hintStyle:  GoogleFonts.ubuntu(
            fontWeight: FontWeight.w100
        ),
        prefixIcon: const Icon(Icons.manage_search),
        suffixIcon:Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            IconButton(
              onPressed: (){
                final resumenProvider = ref.read(resumenNotifierProvider.notifier);
                final resumenList = ref.read(userNotifierProvider).inventario;
                List<ResumenPreview> searchFound = [];
                for (var i = 0; i < resumenList.length; i++) {
                  if (resumenList[i].isFavourite) {
                    searchFound.add(resumenList[i]);
                  }
                }
                resumenProvider.changeList(searchFound);
              }, icon: const Icon(Icons.favorite)
            ),
            IconButton(
                  // ver de sacar si es que no hay nada escrito
                  icon: const Icon(Icons.cancel),
                  onPressed: () {
                    searchValue.text = '';
                    resumenProvider.changeList(resumenList);
                  },
                ),
          ],
        ),
        border: InputBorder.none,
      ),
    );
  }

}
