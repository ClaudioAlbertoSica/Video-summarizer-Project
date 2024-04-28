import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
import '../uicoreStyles/uicore_input_style.dart';
import '../uicoreStyles/uicore_primary_button_style.dart';
import '../uicoreStyles/uicore_title_style.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class LoginScreen extends StatelessWidget {
  static const String name = 'LoginScreen';
  //Aca creo que iria un atributo para guardar lo del form o input.
  final TextEditingController _inputUsernameController = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar:
      AppBar(
        title: const TitleStyle(text:'Kindle'),
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
          image: AssetImage("assets/images/5.jpeg"),
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
               //Agrego espacio al boton
              const SizedBox(height: 10),
              //aca va el login button
              PrimaryButton(
                caller: onClickButtonLogin(context),
                text: 'Login',
              ),
            ],
          ),
        ),
      ),
    );
  }

  onClickButtonLogin(context) {
    print(_inputUsernameController.text);
    print(_inputPassController.text);
    context.goNamed(HomeScreen.name);
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
