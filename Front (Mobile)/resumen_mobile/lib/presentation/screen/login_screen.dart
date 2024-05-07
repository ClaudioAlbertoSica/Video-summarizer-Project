// ignore_for_file: avoid_print

import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/screen/create_account_screen.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_input_style.dart';
import '../uicoreStyles/uicore_montain_backgound.dart';
import '../uicoreStyles/uicore_title_style.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;


class LoginScreen extends ConsumerWidget {
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
  Widget build(BuildContext context, WidgetRef ref) {
    final screenHeight = MediaQuery.of(context).size.height;
    String randomImage =  getRandomImage();
    return Scaffold(
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
               color: Color.fromRGBO(235, 240, 241, 1), // Cambia este color al color que desees para el fondo dentado
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(50.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Text('Writer', 
                  style: GoogleFonts.pacifico(
                    textStyle: Theme.of(context).textTheme.displayLarge,
                    fontSize: 80,
                    color: const Color.fromARGB(255, 5, 5, 5)
                  ),
                ),
                const Text('rabbit', 
                  style: TextStyle(
                    fontFamily: 'PoetsenOne',
                    fontSize: 32,
                  )
                ),
                const SizedBox(height: 120,),
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
                  String? user = await sendLoginData(_inputUsernameController.text,_inputPassController.text, ref);
                    if(user != null) {
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
                      onPressed: (){
                        context.pushNamed(CreateAccountScreen.name);
                      }, 
                      child: Text('Create account', 
                        style: TextStyle(
                          fontFamily: 'PoetsenOne',
                          fontSize: 15,
                          color: Color.fromARGB(255, 5, 5, 5)
                        ),
                      ),
                    ),
                    TextButton(
                      onPressed: (){
                        _showDialogForgotPass(context);
                      },
                      child: Text('Forgot your pass?', 
                        style: TextStyle(
                          fontFamily: 'PoetsenOne',
                          fontSize: 15,
                          color: Color.fromARGB(255, 5, 5, 5)
                        ),
                      ),
                    ),
                  ]
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<String?> sendLoginData(String username, String password, WidgetRef ref) async {
    String? loginOk;
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
      // ver de no guardar el user porque esta el password!!
      //{"_id":"663445cf0a08e557fa580267","id":"3","userName":"Marian@Marian","passwd":"222","inventario":[]}
      ref.read(userProvider.notifier).state = json.decode(response.body)['id'];
      loginOk = response.body;
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
