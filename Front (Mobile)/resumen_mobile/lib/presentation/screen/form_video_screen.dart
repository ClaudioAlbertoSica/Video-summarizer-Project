import 'package:flutter/material.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../uicoreStyles/uicore_app_title_style.dart';

enum Idiomas{ english, spanish}

class CoreFormVideo extends StatelessWidget {
  const CoreFormVideo({super.key});
  static const String name = 'CoreFormVideo';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const AppTitleStyle(text:'David Og', color: Colors.black),
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: BoxDecoration(
          color: Colors.grey[200], // Color de fondo
        ),
        padding: const EdgeInsets.all(15.0),
        child: Column(
          children: [
            const SizedBox(
              height: 250,
              child: Placeholder(),
            ),
            FormVideo(),
          ]
        ),
      ),
    );
  }
}

class FormVideo extends StatefulWidget {
  const FormVideo({
    super.key,
  });

  @override
  State<FormVideo> createState() => _FormVideoState();
}

class _FormVideoState extends State<FormVideo> {
  bool shortValue = false;
  bool transcrpit = false;
  bool imagesObtain = false;
  Idiomas idiomaSeleccionado = Idiomas.spanish; 
  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: [
          TextFormField(
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
            title: const Text('Short resumen'),
            value: shortValue,
            onChanged: (value) {
              shortValue = !shortValue;
              setState((){});
            },
          ),
          SwitchListTile(
            title: const Text('I want transcript'),
            value: transcrpit,
            onChanged: (value) {
              transcrpit = !transcrpit;
              setState((){});
            },
          ),
          SwitchListTile(
            title: const Text('I want Images'),
            value: imagesObtain,
            onChanged: (value) {
              imagesObtain = !imagesObtain;
              setState((){});
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
                  decoration: const InputDecoration(
                  hintText: 'Titulo (Opcional)',
                  border: OutlineInputBorder(
                    borderRadius:  BorderRadius.all(Radius.circular(10)),
                    )
                  ),
                ),
          ElevatedButton(
                onPressed: () {},
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
