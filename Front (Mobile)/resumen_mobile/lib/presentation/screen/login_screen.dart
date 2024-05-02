// ignore_for_file: avoid_print

import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/create_account_screen.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_input_style.dart';
import '../uicoreStyles/uicore_title_style.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class LoginScreen extends StatelessWidget {
  static const String name = 'LoginScreen';
  //Aca creo que iria un atributo para guardar lo del form o input.
  final TextEditingController _inputUsernameController = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();
  final List<String> imageNames = ['1.jpeg'];
  String errorMessage = '';

  // Método para obtener un nombre de imagen aleatorio
  String getRandomImage() {
    Random random = Random(); // Instancia de la clase Random
    int index = random.nextInt(imageNames.length); // Genera un número aleatorio
    return imageNames[index]; // Retorna el nombre de la imagen en el índice aleatorio
  }

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    String randomImage =  getRandomImage();
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const AppTitleStyle(text:'David Og', color: Colors.white),
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/$randomImage'),
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
              ElevatedButton(
                onPressed: () async {
                  bool login = true;//await sendLoginData(_inputUsernameController.text,_inputPassController.text);
                  if(true) {
                    context.goNamed(HomeScreen.name);
                  } else {
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
                  text: 'Login',
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  TextButton(
                    onPressed: (){context.pushNamed(CreateAccountScreen.name);}, 
                    child: const TitleStyle(
                      text: 'Create account',
                    ),
                  ),
                  TextButton(
                    onPressed: (){
                      _showDialogForgotPass(context);
                    }, 
                    child: const TitleStyle(
                      text: 'Forgot your pass?',
                    ),
                  ),
                ]
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<bool> sendLoginData(String username, String password) async {
    bool loginOk = false;
    // servidor Node.js
    final url = Uri.parse('http://localhost:8080/api/login');
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

      loginOk = true;
    } else {
      errorMessage = json.decode(response.body)['error'];
    }
      return loginOk; 
  }
    void _showDialogForgotPass(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Password Recovery'),
          content: const Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Please enter your email address to recover your password:'),
              TextField(
                decoration: InputDecoration(hintText: 'Email'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Cerrar el cuadro de diálogo
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                // Acción para el botón OK
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
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
