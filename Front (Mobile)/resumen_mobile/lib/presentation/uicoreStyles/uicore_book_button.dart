import 'dart:convert';
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
    final isDark = ref.watch(userNotifierProvider).isDark;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      clearImageCache();
    });

    return Card(
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(9.0),
      ),
      child: InkWell(
        onTap: () async {
          await completeResumen(idUser, idRes, context);
        },
        child: Container(
          height: 100,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(9),
                child: getImage(isDark),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      resumen.title,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    getPill(),
                  ],
                ),
              ),
              const SizedBox(width: 10),
              Column(
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
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Función para limpiar el caché de imágenes
  void clearImageCache() {
    imageCache.clear();
    imageCache.clearLiveImages();
  }

  Container getPill() {
    if (resumen.isFavourite) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
        decoration: BoxDecoration(
          color: Colors.orange.shade400,
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Text(
          'favorite',
          style: TextStyle(
            color: Colors.white,
            fontSize: 8,
            fontWeight: FontWeight.bold,
          ),
        ),
      );
    }
    return Container();
  }

Image getImage(isDark) {
    if (resumen.thumbnail != null && resumen.thumbnail != "") {
      try {
/*         // Decodificar la cadena binaria
        final thumbnailBytes = base64Decode(resumen.thumbnail!);
        Uint8List bytes = Uint8List.fromList(thumbnailBytes); */
        return Image.network(
          resumen.thumbnail!,
          width: 70,
          height: 70,
          fit: BoxFit.cover,
          errorBuilder: (BuildContext context, Object exception, StackTrace? stackTrace) {
            // Mostrar una imagen de error si falla la carga
            return Image.asset(
              isDark ? 'assets/images/errorThumbnailD.gif' : 'assets/images/errorThumbnail.gif',
              width: 70,
              height: 70,
              fit: BoxFit.cover,
            );
          },
        );
      } catch (e) {
        print('Error al decodificar la imagen: $e');
        // Si la decodificación falla, retorna un contenedor vacío
        return Image.asset(
          'assets/images/errorThumbnail.gif',
          width: 70,
          height: 70,
          fit: BoxFit.cover,
        );
      }
    }
    return Image.asset(
      'assets/images/thumball.jpeg',
      width: 70,
      height: 70,
      fit: BoxFit.cover,
    );
  }

  Future<void> completeResumen(String idUser, String idRes, BuildContext context) async {
    try {
      final url = Uri.parse('http://localhost:8080/api/$idUser/resumen/$idRes');
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
