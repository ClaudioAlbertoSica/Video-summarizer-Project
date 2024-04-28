
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class InputKindle extends StatelessWidget {
  final TextEditingController inputController;
  final String label;
  final bool obscureText;

  const InputKindle({
    super.key,
    required this.obscureText,
    required this.label,
    required this.inputController
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      obscureText: obscureText,
      controller: inputController,
      style: GoogleFonts.zillaSlab(
        textStyle: Theme.of(context).textTheme.displayLarge,
        fontSize: 16,
        fontWeight: FontWeight.w500,
        fontStyle: FontStyle.normal,
        color: Colors.black87
      ),
      cursorColor: Colors.black54,
      decoration: InputDecoration(
        fillColor: const Color.fromARGB(211, 255, 255, 255),
        floatingLabelBehavior: FloatingLabelBehavior.never,
        filled: true,
        labelText: label,
        labelStyle: GoogleFonts.zillaSlab(
          fontStyle: FontStyle.normal,
          fontSize: 16,
          color: Colors.black45
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(30.0), // Ajusta el radio para hacer los bordes redondeados
          borderSide: const BorderSide(color: Colors.transparent), // Oculta el borde
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(30.0), // Ajusta el radio para hacer los bordes redondeados
          borderSide: const BorderSide(color: Colors.transparent), // Oculta el borde
        ),
      ),
    );
  }
}
