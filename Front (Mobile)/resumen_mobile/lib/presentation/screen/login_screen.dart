import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/core/service/server.dart';
import 'package:resumen_mobile/presentation/providers/user_provider.dart';
import 'package:resumen_mobile/presentation/screen/account_screeen.dart';
import 'package:resumen_mobile/presentation/screen/create_account_screen.dart';
import 'package:resumen_mobile/presentation/screen/home_screen.dart';
import '../uicoreStyles/uicore_input_style.dart';
import '../uicoreStyles/uicore_montain_backgound.dart';
import '../uicoreStyles/uicore_title_style.dart';



class LoginScreen extends ConsumerWidget {
  static const String name = 'LoginScreen';
  //Aca creo que iria un atributo para guardar lo del form o input.
  final TextEditingController _inputUsernameController = TextEditingController();
  final TextEditingController _inputPassController = TextEditingController();



  LoginScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final screenHeight = MediaQuery.of(context).size.height;
    final double keyboardHeight = MediaQuery.of(context).viewInsets.bottom;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      clearImageCache();
    });


    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: Stack(
        children: [
          //MODULARICÉ UN POCO
          _ImagenContainer(screenHeight: screenHeight),
          //MODULARICÉ UN POCO
          _PositionedFill(keyboardSize: keyboardHeight),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 50),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Image.asset(
                  'assets/images/WriterRabbitLogo.png',
                  height: screenHeight * 0.15,  
                ),
                const SizedBox(height: 70,),
                InputKindle(label:'Correo electrónico', obscureText: false, inputController: _inputUsernameController),
                //espacio entre inputs
                const SizedBox(height: 10),
                //input para password
                InputKindle(label:'Contraseña', obscureText: true, inputController: _inputPassController),
                //Agrego espacio al boton
                const SizedBox(height: 10),
                //aca va el login button
                ElevatedButton(
                  onPressed: () async {
                    bool user = await Server.sendLoginData(_inputUsernameController.text,_inputPassController.text, ref);
                    if (user) {
                      final bool provisoria =  ref.read(userNotifierProvider).provisoria;
                      if(provisoria){
                      context.goNamed(AcconutScreen.name, extra: 
                      const Column(
                        crossAxisAlignment: CrossAxisAlignment.center ,
                        children: [
                          Text('Su contraseña es provisoria. Deberá cambiarla para continuar navegando.',
                            textAlign: TextAlign.center,),
                          Text('La misma que utilizó para ingresar deberá colocarla en el primer campo.',
                            textAlign: TextAlign.center,),
                          SizedBox(height: 10,),
                        ],));
                        }else{
                          context.goNamed(HomeScreen.name);
                        }
                    } else {
                      Server.showErrorMessage(context);
                    }
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
                    elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
                    overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
                    shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
                    
                  ),
                  child: const TitleStyle(
                    text: 'Inicio de sesión',
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
                      child: const _ButtonCreateForgot(text: 'Crear cuenta'),
                    ),
                    TextButton(
                      onPressed: (){
                        _showDialogForgotPass(context);
                      },
                      //MODULARICÉ UN POCO
                      child:const _ButtonCreateForgot(text: 'Olvide mi clave'),
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
  
  // Función para limpiar el caché de imágenes
  void clearImageCache() {
    imageCache.clear();
    imageCache.clearLiveImages();
  }


  void _showDialogForgotPass(BuildContext context) {
  TextEditingController _inputForgotController = TextEditingController();
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Recuperación de contraseñas'),
          content: Form(
            autovalidateMode: AutovalidateMode.always,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text('Introduzca su dirección de correo electrónico para recuperar su contraseña:'),
                TextFormField(
                  decoration:const  InputDecoration(hintText: 'Correo electrónico'),
                  controller: _inputForgotController,
                  validator:  (String? value) {
                    return (value == '' || value == null) ? 'Este campo es requerido.' : null;
                    },
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Cerrar el cuadro de diálogo
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                bool sendOk = await Server.recuperarContrasenia(_inputForgotController.text);
                if(sendOk){
                  Navigator.of(context).pop();
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: const Text('Recuperación de contraseñas'),
                        content: const Text('Ya enviamos tu petición a tu correo electronico.'),
                        actions: [
                          TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: const Text('Iniciar sesión')
                          ),
                        ]
                      );
                    }
                  );
                } else {
                  Server.showErrorMessage(context);
                }
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
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

  final double keyboardSize;
  const _PositionedFill({
    super.key,
    required this.keyboardSize
  });

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: ClipPath(
        clipper: MountainClipper(keyboardSize: keyboardSize),
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
