import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_montain_backgound.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../uicoreStyles/uicore_app_title_style.dart';

enum Idiomas{ english, spanish}

class CoreFormVideo extends ConsumerWidget {
  const CoreFormVideo({super.key});
  static const String name = 'CoreFormVideo';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = ref.watch(themeNotifierProvider).isDark;
    final screenHeight = MediaQuery.of(context).size.height;
    final idUser = ref.watch(userProvider.notifier).state;
    final background = ref.watch(themeNotifierProvider)
      .isDark 
        ? 'formVideoResumenBackgroundD.gif' 
        : 'formVideoResumenBackground.gif';
    
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        //title: const AppTitleStyle(text:'', color: Colors.black),
        //centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: StackLayout(
        screenHeight: screenHeight,
        backgroundImage: background,
        backgroundColor: isDark ? Color.fromRGBO(30, 30, 30, 1) : Color.fromRGBO(235, 240, 241, 1),
        content:[
          SizedBox(height: 10,),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
              FormVideo(id: idUser as String),
              ]
            ),
          ),
        ],
      ),
    );
  }
}

class FormVideo extends StatefulWidget {
  final String id;
  const FormVideo({
    super.key,
    required this.id,
  });

  @override
  State<FormVideo> createState() => _FormVideoState();
}

class _FormVideoState extends State<FormVideo> {

  bool shortValue = false;
  bool transcrpit = false;
  bool imagesObtain = false;

  final TextEditingController _inputURLController = TextEditingController();
  final TextEditingController _inputTitleController = TextEditingController();
  
  Idiomas idiomaSeleccionado = Idiomas.spanish;

  @override
  Widget build(BuildContext context) {
    return Form(
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
              SwitchListTile(
                title: const Text('Quiero la Transcripción'),
                value: transcrpit,
                onChanged: (value) {
                  setState((){
                    transcrpit = value;
                  });
                },
              ),
              SwitchListTile(
                title: const Text('Quiero las imágenes'),
                value: imagesObtain,
                onChanged: (value) {
                  setState((){
                    imagesObtain = value;
                  });
                },
              ),
              ExpansionTile(
                title: const Text('Idioma'),
                subtitle: const Text('Selecciona el idioma.'),
                children:[
                  RadioListTile(
                    title: Text(Idiomas.english.name),
                    value: Idiomas.english, 
                    groupValue: idiomaSeleccionado, 
                    onChanged: (value){
                      idiomaSeleccionado = value as Idiomas;
                      setState(() {});
                    }
                    ),
                  RadioListTile(
                    title: Text(Idiomas.spanish.name),
                    value: Idiomas.spanish, 
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
                SizedBox(height: 25,),
            ],
          ),
          ElevatedButton(
                    onPressed: () {
                      print(_inputURLController.text);
                      print(shortValue);
                      print(transcrpit);
                      print(imagesObtain);
                      print(idiomaSeleccionado);
                      print(_inputTitleController.text);
                      print(widget.id);
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
