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
        child: const Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Aquí puedes agregar tu imagen
            Icon(Icons.book, size: 50),
            SizedBox(height: 8), // Espacio entre la imagen y el texto
            Text(
              'Resumen video',
              style: TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}
