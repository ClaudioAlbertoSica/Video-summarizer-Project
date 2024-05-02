import 'package:flutter/material.dart';

class BookButton extends StatelessWidget {
  const BookButton({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 150,
      height: 200,
      child: ElevatedButton(
        onPressed: () {},
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all<Color>(const Color(0xFF243035)),
          elevation: MaterialStateProperty.all<double>(20), // Ajusta la elevación para la sombra exterior
          overlayColor: MaterialStateProperty.all<Color>(const Color.fromARGB(0, 3, 3, 3)), // Elimina el color de superposición para un efecto más suave
          shadowColor: MaterialStateProperty.all<Color>(const Color.fromARGB(177, 3, 3, 3).withOpacity(0.4)), // Color de la sombra
          shape:MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(4.0), // Ajusta el radio de los bordes para hacerlos más redondeados
              side: const BorderSide(color: Colors.blueGrey)
            ), // Añade un borde para la sombra interior
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(height: 20,),

            Container(
              height: 60, // Ajusta el tamaño de la imagen
              decoration: BoxDecoration(
                image: const DecorationImage(
                  image: AssetImage('assets/images/thumball.jpeg'),
                  fit: BoxFit.cover,
                ),
                borderRadius: BorderRadius.circular(2), // Hace que la imagen sea circular
              ),
            ),
            const SizedBox(height: 8), // Espacio entre la imagen y el texto
            const Text(
              'Sledge Hammer RoboHammer S02E10 Latino',
              style: TextStyle(color: Colors.white, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}
