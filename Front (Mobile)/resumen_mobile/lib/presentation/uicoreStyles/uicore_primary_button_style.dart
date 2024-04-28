import 'package:flutter/material.dart';
import 'package:resumen_mobile/presentation/uicoreStyles/uicore_title_style.dart';

class PrimaryButton extends StatelessWidget {
  final Function caller;
  final String text;
  const PrimaryButton({
    super.key,
    required this.caller,
    required this.text,
  });


  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        caller;
      },
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
        elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
        overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
        shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
        
      ),
      child: TitleStyle(
        text: text,
      ),
    );
  }
}
