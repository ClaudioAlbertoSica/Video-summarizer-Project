import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

//ENUM CON LOS IDIOMAS A ELEGIR 
enum Idiomas{ english, spanish}


class CoreFormVideo extends ConsumerWidget {
  const CoreFormVideo({super.key});
  static const String name = 'CoreFormVideo';

  @override
  Widget build(BuildContext context, ref) {
    final idUser = ref.watch(userProvider.notifier).state;
    return Scaffold(
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
            FormVideo(id: idUser as String),
            ]
          ),
        ),
      ]
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

class FormVideo extends StatefulWidget {
  final String id;
  const FormVideo({
    super.key,
    required this.id,
  });
  
  @override
  State<StatefulWidget> createState() => _FormVideoState();
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
                const SizedBox(height: 25,),
            ],
          ),
          ElevatedButton(
                    onPressed: () {
                      /*print(_inputURLController.text);
                      print(shortValue);
                      print(transcrpit);
                      print(imagesObtain);
                      print(idiomaSeleccionado);
                      print(_inputTitleController.text);
                      print(widget.id);*/
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
