import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/form_video_screen.dart';
import 'package:resumen_mobile/presentation/screen/loading_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_input_style.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';
import 'package:http/http.dart' as http;

import '../uicoreStyles/uicore_our_app_bar.dart';

class AcconutScreen extends ConsumerWidget {
  static const String name = 'AcountScreen';
  //Aca creo que iria un atributo para guardar lo del form o input.
  final TextEditingController _inputCurrentPass = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();
  final TextEditingController _inputRepeatPassController = TextEditingController();
  String errorMessage= '';
  Widget msg;

  AcconutScreen({super.key, this.msg = const SizedBox(height: 0.0)});

  @override
  Widget build(BuildContext context, ref) {
    final idUser = ref.watch(userNotifierProvider).id;
    final user = ref.watch(userNotifierProvider).userName;
    
    return Scaffold(
      resizeToAvoidBottomInset: true,
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar:OurAppBar(),
      //MODULARICÉ REUTILIZANDO EL WIDGET QUE ESTÁ EN FORM_VIDEO_SCREEN
      body: StackLayoutCustomized(
            screenHeight: MediaQuery.of(context).size.height,
            colorLight: const Color.fromARGB(255, 241, 253, 255), 
            colorDark: const Color.fromRGBO(30, 30, 30, 1) , 
            imageLigth:'accountScreen.gif' , 
            imageDark:'accountScreenD.gif' , 
            content: [
                Padding(
                  padding: const EdgeInsets.all(50.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Column(
                        children: [
                          ClipRRect(
                              borderRadius: BorderRadius.circular(50),
                              child: SizedBox(height:90, child: Image.asset('assets/images/avatar.png'),),
                            ),
                          const SizedBox(height: 10,),
                          Text(user,  
                            style: const TextStyle(
                              fontFamily: 'PoetsenOne',
                              fontWeight: FontWeight.w500,
                              fontSize: 15,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20,),
                      msg,
                      InputKindle(label:'Ingrese su Pass Actual', obscureText: false, inputController: _inputCurrentPass),
                      //espacio entre inputs
                      const SizedBox(height: 10),
                      //input para password
                      InputKindle(label:'Ingrese su Pass nueva', obscureText: true, inputController: _inputPassController),
                      //espacio entre inputs
                      const SizedBox(height: 10),
                      //input para repeat your password
                      InputKindle(label:'Repita su Pass nueva', obscureText: true, inputController: _inputRepeatPassController),
                      //Agrego espacio al boton
                      const SizedBox(height: 10),
                      //aca va el login button
                      ElevatedButton(
                        onPressed: ()async {
                          if (_inputRepeatPassController.text == _inputPassController.text) {
                              bool changeOk = await changePass(_inputCurrentPass.text,_inputPassController.text, _inputRepeatPassController.text, idUser as String);
                              if (changeOk) {
                              context.goNamed(LoadingScreen.name, extra: 'Cambio de contraseña exitoso!');
                            } else {
                              _showErrorMessage(context);
                            }
                          }else{
                            errorMessage = 'Las contraseñas nuevas deben ser iguales.';
                            _showErrorMessage(context);
                          }

                        },
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
                          elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
                          overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
                          shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
                          
                        ),
                        child: const TitleStyle(
                          text: 'Cambiar Pass',
                        ),
                      ),
                    ],
                  ),
                ),
            ]
        ),
    );
  }


Future<bool> changePass(String passActual, String passNueva, String passNuevaBis, String idUser) async {
    bool changeOk = false;
    
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('http://10.0.2.2:8080/api/cambiarpass/$idUser');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
        'passActual': passActual,
        'passNueva': passNueva,
        'passNuevaBis': passNuevaBis,
      }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        print('Respuesta del servidor: ${response.body}');

        changeOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }

    return changeOk;
  }


  void _showErrorMessage(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(errorMessage),
        backgroundColor: Colors.orange[700],
      ),
    );
  }
}
