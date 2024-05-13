import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

enum Idiomas{ english, spanish}

class CoreFormText extends ConsumerWidget {
  const CoreFormText({super.key});
  static const String name = 'CoreFormText';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = ref.watch(themeNotifierProvider).isDark;
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
        //title: const AppTitleStyle(text:'David Og', color: Colors.black),
        //centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: StackLayout(
        screenHeight: screenHeight,
        backgroundImage: background,
        backgroundColor: isDark ? Color.fromRGBO(30, 30, 30, 1) : Color.fromARGB(255, 255, 241, 241),
        content:[
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              children: [
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
          ElevatedButton(
                onPressed: () {
                  print(_inputTextController.text);
                  print(shortValue);
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
