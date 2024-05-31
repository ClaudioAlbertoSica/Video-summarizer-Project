import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/core/service/server.dart';
import '../../entity/preview_resumen.dart';
import '../providers/user_provider.dart';

class BookButton extends ConsumerWidget {
  BookButton({
    super.key,
    required this.resumen,
  });

  final ResumenPreview resumen;
  bool imText = false;
  int? idResImage;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final idUser = ref.watch(userNotifierProvider).id;
    final idRes = resumen.idres;
    idResImage = (int.parse(idRes) - 1 ) % 10 + 1;
    final isDark = ref.watch(userNotifierProvider).isDark;
    Image imageThumbnail = getImage(isDark);
    
    WidgetsBinding.instance.addPostFrameCallback((_) {
      clearImageCache();
    });

    return Card(
      color: isDark ? null : imText ? const Color.fromRGBO(245, 54, 84, 1) : const Color.fromRGBO(69, 179, 156, 1),
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(9.0),
      ),
      child: InkWell(
        onTap: () async {
          await Server.completeResumen(idUser, idRes, context, ref);
        },
        child: Container(
          height: 100,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(9),
                child: imageThumbnail,
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      resumen.title,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
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
                          color: Colors.white
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
        return Image.asset(
          'assets/images/errorThumbnail.gif',
          width: 70,
          height: 70,
          fit: BoxFit.cover,
        );
      }
    }
    imText = true;
    return Image.asset(
      'assets/images/$idResImage.png',
      width: 70,
      height: 70,
      fit: BoxFit.cover,
    );
  }


}
