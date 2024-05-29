import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/entity/user.dart';
import 'package:resumen_mobile/presentation/providers/list_resumen_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/loading_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_navigation_bar.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';
import 'package:http/http.dart' as http;
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
  
  const StackLayoutCustomized({
    super.key,
    required this.screenHeight,
    required this.colorLight,
    required this.colorDark,
    required this.imageLigth,
    required this.imageDark,
    required this.content
    
  });


  @override
  Widget build(BuildContext context, ref) {
    final isDark = ref.watch(userNotifierProvider).isDark;
    final background = ref.watch(userNotifierProvider)
      .isDark 
        ? imageDark
        : imageLigth;
    
    
    
    return StackLayout(
      screenHeight: screenHeight,
      backgroundImage: background,
      backgroundColor: isDark ? colorDark  : colorLight,
      content: content,
    );
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
                subtitle: const Text('Selecciona el idioma.'),
                children:[
                  RadioListTile(
                    title: const Text('Inglés'),
                    value: Idiomas.EN, 
                    groupValue: idiomaSeleccionado, 
                    onChanged: (value){
                      idiomaSeleccionado = value as Idiomas;
                      setState(() {});
                    }
                    ),
                  RadioListTile(
                    title: const Text('Español'),
                    value: Idiomas.ES, 
                    groupValue: idiomaSeleccionado, 
                    onChanged: (value){
                      idiomaSeleccionado = value as Idiomas;
                      setState(() {});
                    }
                    ),
                  RadioListTile(
                    title: const Text('Francés'),
                    value: Idiomas.FR, 
                    groupValue: idiomaSeleccionado, 
                    onChanged: (value){
                      idiomaSeleccionado = value as Idiomas;
                      setState(() {});
                    }
                    ),
                  RadioListTile(
                    title: const Text('Portugues'),
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
                      if(!inProgress){
                        final bool creando = await crearResumenVideo(widget.id, ref);
                        if(creando){
                          context.goNamed(LoadingScreen.name, extra: 'Estamos generando tu resumen! Esto puede demorar unos minutos...');
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

  Future<bool> crearResumenVideo(String idUser, WidgetRef ref) async {
    bool creando = false;
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('http://10.0.2.2:8080/api/$idUser/resumen/video');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, void>{
        'url':_inputURLController.text,
        'esBreve':shortValue,
        'idioma':idiomaSeleccionado.name,
        'title': _inputTitleController.text
        }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        print('Respuesta del servidor: ${response.body}');
        creando = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }
    return creando;
  }

  Future<bool> isInProgress(String idUser) async {
    bool inProgress = ref.read(userNotifierProvider).inProgress;
    try {
      final url = Uri.parse('http://10.0.2.2:8080/api/inprogress/$idUser');
      final response = await http.get(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        inProgress = jsonData;
        ref.read(userNotifierProvider.notifier).setInProgress(inProgress);
        if(!inProgress){
          await actualizarUsuario(idUser);
        }
      } else {
        
          errorMessage = json.decode(response.body)['error'];
        
      }
    } catch (error) {
      
        errorMessage = 'Error: Connection ERROR - Server not found';
    
    }
    return inProgress;
  }


  Future<void> actualizarUsuario(String idUser) async {
    
    try {
      final url = Uri.parse('http://10.0.2.2:8080/api/$idUser');
      final response = await http.get(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        final rsp = json.decode(response.body);

        User userActualizado = User(
            userName: rsp['userName'],
            id: rsp['id'],
            inventario: (rsp['inventario'] as List)
              .map((item) => ResumenPreview.fromJson(item))
              .toList(), 
            inProgress: rsp['inProgress'],
            isDark: rsp['config']['isDark'],
            provisoria: rsp['provisoria'],
          );

          ref.read(resumenNotifierProvider.notifier).changeList(userActualizado.inventario);
          ref.read(userNotifierProvider.notifier).setUserLogin(userActualizado);
      } else {
        
          errorMessage = json.decode(response.body)['error'];
        
      }
    } catch (error) {
      
        errorMessage = 'Error: Connection ERROR - Server not found';
    
    }
  }
}
