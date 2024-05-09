import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_montain_backgound.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../uicoreStyles/uicore_app_title_style.dart';

enum Idiomas{ english, spanish}

class CoreFormText extends ConsumerWidget {
  const CoreFormText({super.key});
  static const String name = 'CoreFormText';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final screenHeight = MediaQuery.of(context).size.height;
    final idUser = ref.watch(userProvider.notifier).state;
    final background = ref.watch(themeNotifierProvider)
      .isDark 
        ? 'formTextResumenBackgroundD.gif' 
        : 'formTextResumenBackground.gif';

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
                image: AssetImage('assets/images/$background'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Positioned.fill(
            child: ClipPath(
              clipper: MountainClipperMediumFlat(),
              child: Container(
               color: Color.fromRGBO(235, 240, 241, 1), // Cambia este color al color que desees para el fondo dentado
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              children: [
                const SizedBox(
                  height: 250,
                ),
                FormText(id: idUser as String),
              ]
            ),
          ),
        ]
      ),
    );
  }
}

class FormText extends StatefulWidget {
  final String id;
  const FormText({
    super.key,
    required this.id,
  });

  @override
  State<FormText> createState() => _FormTextState();
}

class _FormTextState extends State<FormText> {

  bool shortValue = false;
  bool transcrpit = false;
  bool imagesObtain = false;

  final TextEditingController _inputTextController = TextEditingController();
  final TextEditingController _inputTitleController = TextEditingController();
  
  Idiomas idiomaSeleccionado = Idiomas.spanish;

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          TextFormField(
            maxLines: 4,
            keyboardType: TextInputType.multiline,
            controller: _inputTextController,
            decoration: const InputDecoration(
              hintText: 'Apply your text',
              border: OutlineInputBorder(
                borderRadius:  BorderRadius.all(Radius.circular(10)),
              )
            ),
            validator: (String? value) {
              return(value == '' || value == null) ? 'Este campo es requerido.' : null;
            },
          ),
          SwitchListTile(
            title: const Text('Short resumen'),
            value: shortValue,
            onChanged: (value) {
              setState((){
                shortValue = value;
              });
            },
          ),
          SwitchListTile(
            title: const Text('I want transcript'),
            value: transcrpit,
            onChanged: (value) {
              setState((){
                transcrpit = value;
              });
            },
          ),
          SwitchListTile(
            title: const Text('I want Images'),
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
          ElevatedButton(
                onPressed: () {
                  print(_inputTextController.text);
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
              ),
        ],
      ),
    );
  }
}
