import 'package:flutter/material.dart';

import '../uicoreStyles/uicore_app_title_style.dart';

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
        ],
      ),
    );
  }
}
