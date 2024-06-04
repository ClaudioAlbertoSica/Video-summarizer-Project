import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/core/service/server.dart';
import 'package:resumen_mobile/presentation/screen/login_screen.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_montain_backgound.dart';
import '../uicoreStyles/uicore_app_title_style.dart';
import '../uicoreStyles/uicore_input_style.dart';
import '../uicoreStyles/uicore_title_style.dart';


class CreateAccountScreen extends StatelessWidget {
  static const String name = 'CreateAccountScreen';
  final TextEditingController _inputUsernameController = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();
  final TextEditingController _inputRepeatPassController = TextEditingController();

  CreateAccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    final double keyboardHeight = MediaQuery.of(context).viewInsets.bottom;
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
              clipper: MountainClipper(keyboardSize: keyboardHeight),
              child: Container(
               color: const Color.fromRGBO(235, 240, 241, 1), // Cambia este color al color que desees para el fondo dentado
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 50),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Image.asset(
                  'assets/images/WriterRabbitLogo.png',
                  height: screenHeight * 0.15,  
                ),
                const SizedBox(height: 60,),
                //input para usuario
                InputKindle(label:'Correo electrónico', obscureText: false, inputController: _inputUsernameController),
                //espacio entre inputs
                const SizedBox(height: 10),
                //input para password
                InputKindle(label:'Contraseña', obscureText: true, inputController: _inputPassController),
                //espacio entre inputs
                const SizedBox(height: 10),
                //input para repeat your password
                InputKindle(label:'Repetir contraseña', obscureText: true, inputController: _inputRepeatPassController),
                //Agrego espacio al boton
                const SizedBox(height: 10),
                //aca va el login button
                ElevatedButton(
                  onPressed: () async {
                    bool completeInputs = _validateInputs(_inputUsernameController.text, _inputPassController.text, _inputRepeatPassController.text);
                    if (completeInputs) {
                      if (_inputRepeatPassController.text == _inputPassController.text) {
                          bool created = await Server.sendCreateUser(_inputUsernameController.text,_inputPassController.text);
                          if (created) {
                            context.goNamed(LoginScreen.name);
                        } else {
                          Server.showErrorMessage(context);
                        }
                      } else{
                        Server.showMsg(context, 'Las contraseñas deben ser iguales.');
                      }
                    } else {
                        Server.showMsg(context, 'Los campos no deben estar vacios.');
                    }
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
                    elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
                    overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
                    shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
                    
                  ),
                  child: const TitleStyle(
                    text: 'Crear cuenta',
                  ),
                ),
                SizedBox(height: 30,)
              ],
            ),
          ),
        ]
      ),
    );
  }

  bool _validateInputs(String? value1, String? value2, String? value3) {
    return !((value1 == '' || value1 == null) && (value2 == '' || value2 == null) && (value3 == '' || value3 == null));
  }
}
