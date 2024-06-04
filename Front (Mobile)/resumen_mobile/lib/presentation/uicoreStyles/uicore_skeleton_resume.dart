import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/core/service/server.dart';

class SkeletonResume extends ConsumerWidget {
  const SkeletonResume({
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    
    WidgetsBinding.instance.addPostFrameCallback((_) {
      clearImageCache();
    });

    return Card(
      color: const Color.fromARGB(53, 35, 255, 226),
      clipBehavior: Clip.antiAlias,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(bottomLeft: Radius.circular(5.0), bottomRight: Radius.circular(5.0)),
      ),
      child: InkWell(
        onTap: () {
          Server.showMsg(context, 'Tu resumen esta siendo generado.');
        },
        child: Container(
          height: 40,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          child: const  Row(
            children: [
              SizedBox(height:10, width: 10, child:CircularProgressIndicator(color: Colors.white,)),
              SizedBox(width: 10),
              Text(
                      'Resumiendo...',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
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
}
