// ignore_for_file: avoid_print

import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
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

  CreateAccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar:
      AppBar(
        title: const AppTitleStyle(text:'David Og', color: Colors.white),
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
          image: AssetImage('assets/images/1.jpeg'),
          fit: BoxFit.cover,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(50.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
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
                onPressed: () {
                  print(_inputUsernameController.text);
                  print(_inputPassController.text);
                  print(_inputRepeatPassController.text);

                  if (_inputRepeatPassController.text == _inputPassController.text) {
                    //Send al back para ver si el email ya esta creado
                    print('Logeame capo');
                    context.goNamed(HomeScreen.name);
                  }

                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
                  elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
                  overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
                  shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
                  
                ),
                child: const TitleStyle(
                  text: 'Login',
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<bool> sendLoginData(String username, String password) async {
    bool loginOk = false;
    final url = Uri.parse('http://localhost:8080/api/login'); // Reemplaza con la URL de tu servidor Node.js
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'username': username,
        'password': password,
      }),
    );
    //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
    if (response.statusCode == 200) {
      // Si la solicitud es exitosa, imprime la respuesta del servidor
      print('Respuesta del servidor: ${response.body}');

      loginOk = true;
      
      // Aquí puedes manejar la respuesta del servidor como desees
      // Por ejemplo, puedes convertir la respuesta JSON en un objeto Dart
      //final Map<String, dynamic> userData = jsonDecode(response.body);
      // Y usar los datos del usuario en tu aplicación
    } //else {
      // Si la solicitud no es exitosa, imprime el mensaje de error
      //print('Error al enviar los datos de inicio de sesión: ${response.statusCode}');
      //}
      return loginOk; 
  }
}
