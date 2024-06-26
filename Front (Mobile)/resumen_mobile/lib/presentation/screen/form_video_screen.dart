import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/core/service/server.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/loading_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_navigation_bar.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';
import 'form_text_screen.dart';
import 'home_screen.dart';

//ENUM CON LOS IDIOMAS A ELEGIR 
enum Idiomas{ EN, ES, FR, PT}


class CoreFormVideo extends ConsumerStatefulWidget {
  const CoreFormVideo({super.key});
  static const String name = 'CoreFormVideo';

  @override
  _CoreFormVideoState createState() => _CoreFormVideoState();
}
class _CoreFormVideoState extends ConsumerState<CoreFormVideo> {
  final int _selectedIndex = 0;

  void _onItemTapped(int index) {
    if (index == 1) {
      context.goNamed(HomeScreen.name);
    } else if (index == 2) {
      context.goNamed(CoreFormText.name);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = ref.watch(userNotifierProvider).isDark;
    final idUser = ref.watch(userNotifierProvider).id;
    return Scaffold(
      resizeToAvoidBottomInset: true,
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        //title: const AppTitleStyle(text:'', color: Colors.black),
        //centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      //MODULARICÉ
      body: StackLayoutCustomized(
        keyboardHeight: MediaQuery.of(context).viewInsets.bottom,
        screenHeight: MediaQuery.of(context).size.height,
        colorLight:const Color.fromRGBO(235, 240, 241, 1) ,
        colorDark:const Color.fromRGBO(30, 30, 30, 1),
        imageLigth: 'formVideoResumenBackground.gif' ,
        imageDark: 'formVideoResumenBackgroundD.gif' ,
        content: [
          const SizedBox(height: 10,),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
              FormVideo(id: idUser),
              ]
            ),
          ),
        ]
      ),
      bottomNavigationBar: UicoreNavigationBar(
        onTap: _onItemTapped,
        initialIndex: _selectedIndex,
        color: const Color.fromRGBO(235, 240, 241, 1),
        isDark: isDark,
      ),
    );
  }
}

//WIDGET QUE PERSONALIZA EL STACKLAYOUT

class StackLayoutCustomized extends ConsumerWidget {
  //Recibo los colores los gifs para el background tanto en su versión light como dark
  //Recibo una lista de Widgets que será mi content
  final Color colorLight;
  final Color colorDark;
  final String imageLigth;
  final String imageDark;
  final  List<Widget> content;
  final double screenHeight;
  final double keyboardHeight;
  
  const StackLayoutCustomized({
    super.key,
    required this.screenHeight,
    required this.colorLight,
    required this.colorDark,
    required this.imageLigth,
    required this.imageDark,
    required this.content,
    required this.keyboardHeight,
  });


  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = ref.watch(userNotifierProvider).isDark;
    final background = ref.watch(userNotifierProvider)
      .isDark 
        ? imageDark
        : imageLigth;
    
    WidgetsBinding.instance.addPostFrameCallback((_) {
      clearImageCache();
    });

    return StackLayout(
      keyboardHeight: keyboardHeight,
      screenHeight: screenHeight,
      backgroundImage: background,
      backgroundColor: isDark ? colorDark  : colorLight,
      content: content,
    );
  }

  void clearImageCache() {
    imageCache.clear();
    imageCache.clearLiveImages();
  }
}

class FormVideo extends ConsumerStatefulWidget {
  final String id;
  
  const FormVideo({
    super.key,
    required this.id,
  });
  
  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _FormVideoState();
}

class _FormVideoState extends ConsumerState<FormVideo> {

  bool shortValue = false;
  String errorMessage = '';
  final TextEditingController _inputURLController = TextEditingController();
  final TextEditingController _inputTitleController = TextEditingController();
  
  Idiomas idiomaSeleccionado = Idiomas.ES;
  List<String> idiomas = ['Inglés', 'Español', 'Francés', 'Portugués'];
  @override
  Widget build(BuildContext context) {
    final inProgress = ref.watch(userNotifierProvider).inProgress;
    return Form(
      autovalidateMode: AutovalidateMode.always,
      child: Column(
        children: [
          Column(
            children: [
              TextFormField(
                controller: _inputURLController,
                decoration: const InputDecoration(
                  hintText: 'Url youtube video',
                  border: OutlineInputBorder(
                    borderRadius:  BorderRadius.all(Radius.circular(10)),
                  )
                ),
                validator: (String? value) {
                  return(value == '' || value == null) ? 'Este campo es requerido.' : null;
                },
              ),
              SwitchListTile(
                title: const Text('Resumen Breve'),
                value: shortValue,
                onChanged: (value) {
                  setState((){
                    shortValue = value;
                  });
                },
              ),
              ExpansionTile(
                title: const Text('Idioma'),
                subtitle: Text('Idioma seleccionado: ${idiomas[idiomaSeleccionado.index]}'),
                children:[
                  RadioListTile(
                    title: Text(idiomas[0]),
                    value: Idiomas.EN, 
                    groupValue: idiomaSeleccionado, 
                    onChanged: (value){
                      idiomaSeleccionado = value as Idiomas;
                      setState(() {});
                    }
                    ),
                  RadioListTile(
                    title: Text(idiomas[1]),
                    value: Idiomas.ES, 
                    groupValue: idiomaSeleccionado, 
                    onChanged: (value){
                      idiomaSeleccionado = value as Idiomas;
                      setState(() {});
                    }
                    ),
                  RadioListTile(
                    title: Text(idiomas[2]),
                    value: Idiomas.FR, 
                    groupValue: idiomaSeleccionado, 
                    onChanged: (value){
                      idiomaSeleccionado = value as Idiomas;
                      setState(() {});
                    }
                    ),
                  RadioListTile(
                    title: Text(idiomas[3]),
                    value: Idiomas.PT, 
                    groupValue: idiomaSeleccionado, 
                    onChanged: (value){
                      idiomaSeleccionado = value as Idiomas;
                      setState(() {});
                    }
                    )
                ]),
                TextFormField(
                  controller: _inputTitleController,
                  decoration: const InputDecoration(
                    hintText: 'Titulo (Opcional)',
                    border: OutlineInputBorder(
                      borderRadius:  BorderRadius.all(Radius.circular(10)),
                    )
                  ),
                ),
                const SizedBox(height: 25,),
            ],
          ),
          ElevatedButton(
              onPressed: () async {
              if (_inputURLController.text.isEmpty) {
                Server.showMsg(context, 'Debe ingresar una url de youtube.');
              } else if(!inProgress) {
                final bool creando = await Server.crearResumenVideo(widget.id, _inputURLController.text, shortValue, idiomaSeleccionado.name, _inputTitleController.text, ref);
                if(creando){
                  context.goNamed(LoadingScreen.name, extra: 'Estamos generando tu resumen! Esto puede demorar unos minutos...');
                } else {
                  Server.showErrorMessage(context);
                }
              }
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
              elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
              overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
              shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
              
            ),
            child: const TitleStyle(
              text: 'Crear Resumen',
            ),
          )
        ],
      ),
    );
  }

}
