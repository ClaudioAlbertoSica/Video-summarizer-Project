import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../entity/preview_resumen.dart';
import '../screen/login_screen.dart';

class BookButton extends StatelessWidget {
  const BookButton({
    super.key,
    required this.resumen,
  });

  final ResumenPreview resumen;

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(5.0), // Ajusta el radio de los bordes de la tarjeta
      ),
      child: InkWell(
        onTap: () {
          context.pushNamed(LoginScreen.name, extra: resumen);
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              height: 100,
              decoration: BoxDecoration(
                image: const DecorationImage(
                  image: AssetImage('assets/images/thumball.jpeg'),
                  fit: BoxFit.cover,
                ),
                borderRadius: BorderRadius.circular(2), // Hace que la imagen sea circular
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Text(
                    resumen.title,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 12
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 10,),
                  Row(
                    children: [
                      Icon(
                        Icons.star,
                        color: Colors.orange.shade600,
                        size: 15
                      ),
                      Text(
                        '${resumen.range}',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        )
                      ),
                    ]
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
