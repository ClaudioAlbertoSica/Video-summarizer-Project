import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_app_title_style.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_input_style.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_stack_layout.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

class AcconutScreen extends ConsumerWidget {
  static const String name = 'AcountScreen';
  //Aca creo que iria un atributo para guardar lo del form o input.
  final TextEditingController _inputCurrentPass = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();
  final TextEditingController _inputRepeatPassController = TextEditingController();

  AcconutScreen({super.key});

  @override
  Widget build(BuildContext context, ref) {
    final screenHeight = MediaQuery.of(context).size.height;
    final isDark = ref.watch(themeNotifierProvider).isDark;
    final background = ref.watch(themeNotifierProvider)
      .isDark 
        ? 'accountScreenD.gif' 
        : 'accountScreen.gif';

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
      body: StackLayout(
        screenHeight: screenHeight,
        backgroundImage: background,
        backgroundColor: isDark ? const Color.fromRGBO(30, 30, 30, 1) : const Color.fromARGB(255, 241, 253, 255),
        content:[
          Padding(
            padding: const EdgeInsets.all(50.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
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
                  onPressed: () {
                    print(_inputCurrentPass.text);
                    print(_inputPassController.text);
                    print(_inputRepeatPassController.text);

                    if (_inputRepeatPassController.text == _inputPassController.text) {
                      //Send al back para ver si el email ya esta creado
                      print('Logeame capo');
                      //context.goNamed(HomeScreen.name);
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

  /*Future<bool> sendLoginData(String username, String password) async {
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
  }*/
}
