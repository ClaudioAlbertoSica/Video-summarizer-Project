import 'package:flutter/material.dart';
import '../uicoreStyles/uicore_input_style.dart';
import '../uicoreStyles/uicore_title_style.dart';

class LoginScreen extends StatelessWidget {
  static const String name = 'LoginScreen';
  
  //Aca creo que iria un atributo para guardar lo del form o input.

  LoginScreen({super.key});

  final TextEditingController _inputUsernameController = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerEnableOpenDragGesture: false,
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
              //Texto introductorio
              const Padding(
                padding: EdgeInsets.all(50.0),
                child: TitleStyle(text:'Kindle'),
              ),
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
                onPressed: () {
                  print(_inputUsernameController.text);
                  print(_inputPassController.text);
                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
                  elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
                  overlayColor: MaterialStateProperty.all<Color>(Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
                  shadowColor: MaterialStateProperty.all<Color>(Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
                  
                ),
                child: const TitleStyle(
                  text: 'Login',
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
