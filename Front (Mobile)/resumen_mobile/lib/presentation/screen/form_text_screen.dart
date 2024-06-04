import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/core/service/server.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/loading_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';
import '../uicoreStyles/uicore_navigation_bar.dart';
import 'home_screen.dart';

enum Idiomas{ EN, ES, FR, PT}

class CoreFormText extends ConsumerStatefulWidget {
  const CoreFormText({super.key});
  static const String name = 'CoreFormText';
  @override
  _CoreFormTextState createState() => _CoreFormTextState();
}

class _CoreFormTextState extends ConsumerState<CoreFormText> {
  final int _selectedIndex = 2;

  void _onItemTapped(int index) {
    if (index == 0) {
      context.goNamed(CoreFormVideo.name);
    } else if (index == 1) {
      context.goNamed(HomeScreen.name);
    }
  }

  @override
  Widget build(BuildContext context) {
    final idUser = ref.watch(userNotifierProvider).id;
    final isDark = ref.watch(userNotifierProvider).isDark;
    return Scaffold(
      resizeToAvoidBottomInset: true,
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        //title: const AppTitleStyle(text:'David Og', color: Colors.black),
        //centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      //MODULARICÉ REUTILIZANDO EL WIDGET QUE ESTÁ EN FORM_VIDEO_SCREEN
      body: StackLayoutCustomized(
        keyboardHeight: MediaQuery.of(context).viewInsets.bottom,
        screenHeight: MediaQuery.of(context).size.height,
        colorLight: const Color.fromARGB(255, 255, 241, 241),
        colorDark: const Color.fromRGBO(30, 30, 30, 1),
        imageLigth: 'formTextResumenBackground.gif',
        imageDark: 'formTextResumenBackgroundD.gif',
        content: [
          const SizedBox(height: 10,),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: Column(
              children: [
                FormText(id: idUser),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: UicoreNavigationBar(
        onTap: _onItemTapped,
        initialIndex: _selectedIndex,
        color:const Color.fromARGB(255, 255, 241, 241),
        isDark: isDark,
      ),
    );
  }
}

class FormText extends ConsumerStatefulWidget {
  final String id;
  const FormText({
    super.key,
    required this.id,
  });

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _FormTextState();
}

class _FormTextState extends ConsumerState<FormText> {
  bool shortValue = false;
  final TextEditingController _inputTextController = TextEditingController();
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
          TextFormField(
            maxLines: 4,
            keyboardType: TextInputType.multiline,
            controller: _inputTextController,
            decoration: const InputDecoration(
              hintText: 'Aplique su texto',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
            ),
            validator: (String? value) {
              return (value == '' || value == null) ? 'Este campo es requerido.' : null;
            },
          ),
          SwitchListTile(
            title: const Text('Resumen Breve'),
            value: shortValue,
            onChanged: (value) {
              setState(() {
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
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
            ),
          ),
          const SizedBox(height: 25),
          ElevatedButton(
            onPressed: () async {
              if (_inputTextController.text.isEmpty) {
                Server.showMsg(context, 'Debe ingresar un texto.');
              } else if(!inProgress) {
                final bool creando = await Server.crearResumenTexto(widget.id, _inputTextController.text, shortValue, idiomaSeleccionado.name, _inputTitleController.text, ref);
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
          ),
        ],
      ),
    );
  }

}
