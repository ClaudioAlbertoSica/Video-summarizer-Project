import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LoginScreen extends StatelessWidget {
  static const String name = 'LoginScreen';
  
  //Aca creo que iria un atributo para guardar lo del form o input.

  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawerEnableOpenDragGesture: false,
      body: Padding(
        padding: const EdgeInsets.all(50.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            //aca va el usuario
            const InputKindle(text:'email', offuscate: false),
            //espacio entre inputs
            const SizedBox(height: 10),
            //aca va el password
            const InputKindle(text:'password', offuscate: false),
            //aca va el login button
            ElevatedButton(onPressed: (){}, child: const Text('Login'))
          ],
        ),
      ),
    );
  }
}

class InputKindle extends StatelessWidget {
  final String text;
  final bool offuscate;
  
  const InputKindle({
    super.key,
    required this.text,
    required this.offuscate
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      obscureText: offuscate,
      style: GoogleFonts.zillaSlab(
        textStyle: Theme.of(context).textTheme.displayLarge,
        fontSize: 16,
        fontWeight: FontWeight.w500,
        fontStyle: FontStyle.normal,
        color: Colors.black87
      ),
      cursorColor: Colors.black54,
      decoration: InputDecoration(
        labelText: text,
        labelStyle: GoogleFonts.zillaSlab(
          fontStyle: FontStyle.normal,
          color: Colors.black45
        ),
        border: const OutlineInputBorder(),
        focusedBorder: const OutlineInputBorder(
          borderSide: BorderSide(color: Colors.black, width: 2),
        ),
      ),
    );
  }
}
