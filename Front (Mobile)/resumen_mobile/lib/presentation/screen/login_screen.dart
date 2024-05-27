// ignore_for_file: avoid_print
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/entity/preview_resumen.dart';
import 'package:resumen_mobile/entity/user.dart';
import 'package:resumen_mobile/presentation/providers/list_resumen_provider.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/create_account_screen.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
import '../uicoreStyles/uicore_input_style.dart';
import '../uicoreStyles/uicore_montain_backgound.dart';
import '../uicoreStyles/uicore_title_style.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;


class LoginScreen extends ConsumerStatefulWidget {
  static const String name = 'LoginScreen';

  LoginScreen({super.key});

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final TextEditingController _inputUsernameController = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();
  String errorMessage = '';

  @override
  void initState() {
    super.initState();
    imageCache.clear();
    imageCache.clearLiveImages();
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      //resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
          //MODULARICÉ UN POCO
          _ImagenContainer(screenHeight: screenHeight),
          //MODULARICÉ UN POCO
          _PositionedFill(),
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
                    bool user = await sendLoginData(_inputUsernameController.text,_inputPassController.text, ref);
                    if (user) {
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
                      //MODULARICÉ UN POCO
                      child: const _ButtonCreateForgot(text: 'Create account'),
                    ),
                    TextButton(
                      onPressed: (){
                        _showDialogForgotPass(context);
                      },
                      //MODULARICÉ UN POCO
                      child:const _ButtonCreateForgot(text: 'Forgot your pass?'),
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
  
  Future<bool> sendLoginData(String username, String password, WidgetRef ref) async {
    bool loginOk = false;
    // servidor Node.js
    try {
      //Android emulator, then your server endpoint should be 10.0.2.2:8000 instead of localhost:8000
      final url = Uri.parse('http://localhost:8080/api/login');
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String> {
          'userName': username,
          'passwd': password,
/*           "userName": "marianolegon@gmail.com",
          "passwd": "123", */
        }),
      );
      //CREEMOS QUE EL STATUSCODE SIEMPRE ES 200 OK
      if (response.statusCode == 200) {
        // Si la solicitud es exitosa, imprime la respuesta del servidor
        print('Respuesta del servidor: ${response.body}');
        
        final rsp = json.decode(response.body);

        User userLogueado = User(
            userName: rsp['userName'],
            id: rsp['id'],
            inventario: (rsp['inventario'] as List)
              .map((item) => ResumenPreview.fromJson(item))
              .toList(), 
            inProgress: rsp['inProgress'],
            isDark: rsp['config']['isDark']
          );

          ref.read(resumenNotifierProvider.notifier).changeList(userLogueado.inventario);
          ref.read(userNotifierProvider.notifier).setUserLogin(userLogueado);
          ref.read(userNotifierProvider.notifier).togleDarkMode(userLogueado.isDark);
        loginOk = true;
      } else {
        errorMessage = json.decode(response.body)['error'];
      }
    } catch (error) {
      print(error);
      errorMessage = 'Error: Connection ERROR - Server not found';
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
//MODULARICÉ UN POCO
class _ButtonCreateForgot extends StatelessWidget {
  final String text;
  const _ButtonCreateForgot({
    //super.key,
    required this.text
  });

  @override
  Widget build(BuildContext context) {
    return Text(text, 
      style: const TextStyle(
        fontFamily: 'PoetsenOne',
        fontSize: 15,
        color: Color.fromARGB(255, 5, 5, 5)
      ),
    );
  }
}

class _PositionedFill extends StatelessWidget {
  /*const _PositionedFill({
    super.key,
  });*/

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: ClipPath(
        clipper: MountainClipper(),
        child: Container(
         color: const Color.fromRGBO(235, 240, 241, 1), // Cambia este color al color que desees para el fondo dentado
        ),
      ),
    );
  }
}

class _ImagenContainer extends StatelessWidget {
  const _ImagenContainer({
    //super.key,
    required this.screenHeight,
  });

  final double screenHeight;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: screenHeight * 0.4,
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/fondoConejo.gif'),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
