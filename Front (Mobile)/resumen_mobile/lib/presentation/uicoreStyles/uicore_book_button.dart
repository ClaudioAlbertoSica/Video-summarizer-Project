import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
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
        borderRadius: BorderRadius.circular(9.0), // Ajusta el radio de los bordes de la tarjeta
      ),
      child: ListTile(
        onTap: () {
          context.pushNamed(LoginScreen.name, extra: resumen);
        },
        leading: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage(resumen.image),
                  fit: BoxFit.cover,
                ),
                borderRadius: BorderRadius.circular(8), // Hace que la imagen sea circular
              ),
            ),
        title:Text(resumen.title, 
          style:TextStyle(fontSize: 14,
          fontWeight: FontWeight.bold),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ) ,
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.star,
                    color: Colors.orange,
                    size: 15,
                  ),
                  const SizedBox(width: 5),
                  Text(
                    '${resumen.range}',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
            ),
          ],
        ),//TextButton.icon(onPressed: (){}, icon: Icon(Icons.star), label: Text(resumen.range),),
    ),

    );
  }
}

class CardVieja extends StatelessWidget {
  const CardVieja({
    super.key,
    required this.resumen,
  });

  final ResumenPreview resumen;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        context.pushNamed(LoginScreen.name, extra: resumen);
      },
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                image: const DecorationImage(
                  image: AssetImage('assets/images/thumball.jpeg'),
                  fit: BoxFit.cover,
                ),
                borderRadius: BorderRadius.circular(8), // Hace que la imagen sea circular
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    resumen.title,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      const Row(
                        children: [
                          Icon(
                            Icons.star,
                            color: Colors.orange,
                            size: 15,
                          ),
                          SizedBox(width: 5),
                        ],
                      ),
                      Text(
                        resumen.range,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
