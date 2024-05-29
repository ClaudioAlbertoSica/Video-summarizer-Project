import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

import '../uicoreStyles/uicore_our_app_bar.dart';


enum Idiomas{ english, spanish}

class ReportScreen extends ConsumerWidget {
  const ReportScreen({super.key});
  static const String name = 'ReportScreen';

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    final idUser = ref.watch(userNotifierProvider).id;

    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: OurAppBar(),
      //MODULARICÉ REUTILIZANDO EL WIDGET QUE ESTÁ EN FORM_VIDEO_SCREEN
      body: StackLayoutCustomized(
            screenHeight: MediaQuery.of(context).size.height,
            colorLight: const Color.fromRGBO(225, 225, 222, 1), 
            colorDark: const Color.fromRGBO(30, 30, 30, 1) , 
            imageLigth:'Reports.gif' ,
            imageDark:'ReportsD.gif' ,
            content: [
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: Column(
                  children: [
                    FormText(id: idUser),
              ]
            ),
          ),
        ],
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

  final TextEditingController _reportTextController = TextEditingController();
  
  Idiomas idiomaSeleccionado = Idiomas.spanish;

  @override
  Widget build(BuildContext context) {
    return Form(
      autovalidateMode: AutovalidateMode.always,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Háblenos de su problema',
            textAlign: TextAlign.start,
            style: GoogleFonts.ubuntu(
              fontWeight: FontWeight.w700
            ),
          ),
          const SizedBox(height: 10,),
          TextFormField(
            maxLines: 4,
            keyboardType: TextInputType.multiline,
            controller: _reportTextController,
            decoration: const InputDecoration(
              hintText: 'Aplique su informe',
              border: OutlineInputBorder(
                borderRadius:  BorderRadius.all(Radius.circular(10)),
              )
            ),
            validator: (String? value) {
              return(value == '' || value == null) ? 'Este campo es requerido.' : null;
            },
          ),
          const SizedBox(height: 25,),
          ElevatedButton(
                onPressed: () {
                  
                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
                  elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
                  overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
                  shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
                  
                ),
                child: const TitleStyle(
                  text: 'Enviar reporte',
                ),
              ),
        ],
      ),
    );
  }
}
