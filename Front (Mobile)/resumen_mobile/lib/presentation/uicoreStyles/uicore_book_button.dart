import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:resumen_mobile/presentation/screen/resumen_detail_screen.dart';
import '../../entity/preview_resumen.dart';
import '../providers/user_provider.dart';
import 'package:http/http.dart' as http;

class BookButton extends ConsumerWidget {
  BookButton({
    super.key,
    required this.resumen,
  });

  final ResumenPreview resumen;
  String errorMessage = '';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final idUser = ref.watch(userNotifierProvider).id;
    final idRes = resumen.idres;

    return Card(
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(9.0), // Ajusta el radio de los bordes de la tarjeta
      ),
      child: ListTile(
        onTap: () async {
          await completeResumen(idUser, idRes, context);
        },
        leading: Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage(resumen.thumbnail ?? 'assets/images/thumball.jpeg'),
              fit: BoxFit.cover,
            ),
            borderRadius: BorderRadius.circular(8), // Hace que la imagen sea circular
          ),
        ),
        title: Text(
          resumen.title,
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  Icons.star,
                  color: Colors.orange,
                  size: 15,
                ),
                const SizedBox(width: 5),
                Text(
                  '${resumen.points}',
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ), // TextButton.icon(onPressed: (){}, icon: Icon(Icons.star), label: Text(resumen.range),),
      ),
    );
  }

Future<void> completeResumen(String idUser, String idRes, BuildContext context) async {
    try {
      final url = Uri.parse('http://10.0.2.2:8080/api/$idUser/resumen/$idRes');
      final response = await http.get(url, headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      });

      if (response.statusCode == 200) {
        // Desestructura el JSON para obtener el campo "data"
        final jsonData = json.decode(response.body);
        final pdfData = jsonData['pdf']['data'];

        // Decodifica los datos base64 del PDF
        final pdfBytes = base64Decode(pdfData);

        // Muestra el documento PDF en un Scaffold
        context.pushNamed(ResumenDetailScreen.name, extra: {'resumen': resumen, 'pdfBytes': pdfBytes});

      } else {
        
          errorMessage = json.decode(response.body)['error'];
        
      }
    } catch (error) {
      
        errorMessage = 'Error: Connection ERROR - Server not found';
    
    }
  }

}
