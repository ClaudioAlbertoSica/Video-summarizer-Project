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
      color: const Color.fromARGB(255, 255, 160, 35),
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(9.0),
      ),
      child: InkWell(
        onTap: () {
          Server.showMsg(context, 'Tu resumen esta siendo generado.');
        },
        child: Container(
          height: 40,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(9),
                child: Image.asset(
                  'assets/images/fondoConejo.gif',
                  width: 30,
                  height: 30,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(width: 10),
              const Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Resumiendo...',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 10),
              const Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  SizedBox(height:10, child:CircularProgressIndicator(color: Colors.white,))
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
}
