import 'package:flutter/material.dart';

class MountainBackground extends StatelessWidget {
  final Widget child;
  final String backgroundImage;

  const MountainBackground({
    super.key,
    required this.child,
    required this.backgroundImage,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Fondo con la imagen
        Positioned.fill(
          child: Image.asset(
            backgroundImage,
            fit: BoxFit.cover,
          ),
        ),
        // Fondo con las montañas dentadas encima del GIF
        Positioned.fill(
          child: ClipPath(
            clipper: MountainClipper(),
            child: Container(
              color: const Color.fromARGB(255, 251, 251, 251), // Cambia este color al color que desees para el fondo dentado
            ),
          ),
        ),
        // Contenido principal
        child,
      ],
    );
  }
}

class MountainClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0.1, size.height * 0.25); // Punto inicial del recorte

    // Puntos para crear las montañas dentadas
    var firstControlPoint = Offset(size.width * 0.15, size.height * 0.20);
    var firstEndPoint = Offset(size.width * 0.3, size.height * 0.25);
    path.quadraticBezierTo(firstControlPoint.dx, firstControlPoint.dy, firstEndPoint.dx, firstEndPoint.dy);

    var secondControlPoint = Offset(size.width * 0.5, size.height * 0.32);
    var secondEndPoint = Offset(size.width * 0.7, size.height * 0.25);
    path.quadraticBezierTo(secondControlPoint.dx, secondControlPoint.dy, secondEndPoint.dx, secondEndPoint.dy);

    var thirdControlPoint = Offset(size.width * 0.9, size.height * 0.18);
    var thirdEndPoint = Offset(size.width, size.height * 0.2);
    path.quadraticBezierTo(thirdControlPoint.dx, thirdControlPoint.dy, thirdEndPoint.dx, thirdEndPoint.dy);

    path.lineTo(size.width, size.height); // Punto final del recorte
    path.lineTo(0, size.height); // Línea de cierre

    return path;
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) => false;
}
class MountainClipperMediumFlat extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0.1, size.height * 0.3); // Punto inicial del recorte

    // Puntos para crear las montañas dentadas
    var firstControlPoint = Offset(size.width * 0.15, size.height * 0.28);
    var firstEndPoint = Offset(size.width * 0.3, size.height * 0.31);
    path.quadraticBezierTo(firstControlPoint.dx, firstControlPoint.dy, firstEndPoint.dx, firstEndPoint.dy);

    var secondControlPoint = Offset(size.width * 0.5, size.height * 0.35);
    var secondEndPoint = Offset(size.width * 0.74, size.height * 0.3);
    path.quadraticBezierTo(secondControlPoint.dx, secondControlPoint.dy, secondEndPoint.dx, secondEndPoint.dy);

    var thirdControlPoint = Offset(size.width * 0.85, size.height * 0.28);
    var thirdEndPoint = Offset(size.width, size.height * 0.3);
    path.quadraticBezierTo(thirdControlPoint.dx, thirdControlPoint.dy, thirdEndPoint.dx, thirdEndPoint.dy);

    path.lineTo(size.width, size.height); // Punto final del recorte
    path.lineTo(0, size.height); // Línea de cierre

    return path;
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) => false;
}
