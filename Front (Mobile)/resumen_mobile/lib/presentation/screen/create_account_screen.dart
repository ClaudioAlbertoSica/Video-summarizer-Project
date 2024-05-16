// ignore_for_file: avoid_print
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_montain_backgound.dart';
import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_input_style.dart';
import '../uicoreStyles/uicore_title_style.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class CreateAccountScreen extends StatelessWidget {
  static const String name = 'CreateAccountScreen';
  //Aca creo que iria un atributo para guardar lo del form o input.
  final TextEditingController _inputUsernameController = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();
  final TextEditingController _inputRepeatPassController = TextEditingController();
  String errorMessage = '';

  CreateAccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar:
      AppBar(
        title: const AppTitleStyle(text:'', color: Color.fromARGB(255, 29, 29, 29)),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        iconTheme: const IconThemeData(color:Colors.white),
      ),
      body: Stack(
        children: [
          Container(
            height: screenHeight * 0.4,
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/fondoConejo.gif'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Positioned.fill(
            child: ClipPath(
              clipper: MountainClipper(),
              child: Container(
               color: const Color.fromRGBO(235, 240, 241, 1), // Cambia este color al color que desees para el fondo dentado
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(50.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Image.asset(
                  'assets/images/WriterRabbitLogo.png',
                  height: screenHeight * 0.15,  
                ),
                const SizedBox(height: 120,),
                //input para usuario
                InputKindle(label:'email', obscureText: false, inputController: _inputUsernameController),
                //espacio entre inputs
                const SizedBox(height: 10),
                //input para password
                InputKindle(label:'password', obscureText: true, inputController: _inputPassController),
                //espacio entre inputs
                const SizedBox(height: 10),
                //input para repeat your password
                InputKindle(label:'repeat your password', obscureText: true, inputController: _inputRepeatPassController),
                //Agrego espacio al boton
                const SizedBox(height: 10),
                //aca va el login button
                ElevatedButton(
                  onPressed: () async {
                    bool completeInputs = _validateInputs(_inputUsernameController.text, _inputPassController.text, _inputRepeatPassController.text);
                    if (completeInputs) {
                      if (_inputRepeatPassController.text == _inputPassController.text) {
                          bool created = await sendCreateUser(_inputUsernameController.text,_inputPassController.text);
                          if (created) {
                            context.goNamed(LoginScreen.name);
                        } else {
                          _showErrorMessage(context);
                        }
                      } else{
                        errorMessage = 'Las contraseñas deben ser iguales.';
                        _showErrorMessage(context);
                      }
                    } else {
                        errorMessage = 'Los campos no deben estar vacios.';
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
                    text: 'Create account',
                  ),
                ),
              ],
            ),
          ),
        ]
      ),
    );
  }

  Future<bool> sendCreateUser(String username, String password) async {
    bool createOk = false;
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8080 instead of localhost:8080
      final url = Uri.parse('http://localhost:8080/api/');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String> {
          'userName': username,
          'passwd': password,
        }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        print('Respuesta del servidor: ${response.body}');
        createOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      errorMessage = 'Error: Connection ERROR - Server not found';
    }

    return createOk;
  }

  void _showErrorMessage(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(errorMessage),
        backgroundColor: Colors.orange[700],
      ),
    );
  }
  
  bool _validateInputs(String value1, String value2, String value3) {
    return !((value1 == '' || value1 == null) && (value2 == '' || value2 == null) && (value3 == '' || value3 == null));
  }
}
