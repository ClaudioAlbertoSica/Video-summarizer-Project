import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resumen_mobile/main.dart';
import 'package:resumen_mobile/presentation/providers/theme_provider.dart';

import '../uicoreStyles/uicore_montain_backgound.dart';

class ConfigScreen extends ConsumerWidget {
  const ConfigScreen({super.key});
  static const String name = 'ConfigScreen';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final screenHeight = MediaQuery.of(context).size.height;
    final idUser = ref.watch(userProvider.notifier).state;
    final isDark = ref.watch(themeNotifierProvider).isDark;

    return Scaffold(
      drawerEnableOpenDragGesture: false,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.transparent,
      ),
      body: Stack(
        children: [
          Container(
            height: screenHeight * 0.4,
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/darkScreen.gif'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Positioned.fill(
            child: ClipPath(
              clipper: MountainClipperMediumFlat(),
              child: Container(
               color: Color.fromRGBO(235, 240, 241, 1), // Cambia este color al color que desees para el fondo dentado
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              children: [
                SizedBox(
                  height: screenHeight * 0.32
                ),
                Row(
                  children: [
                    Text(isDark ? 'Light mode' : 'Dark mode'),
                    IconButton(
                      onPressed: () {
                        ref.read(themeNotifierProvider.notifier).togleDarkMode();
                      },
                      icon: isDark ? const Icon(Icons.light_mode) : const Icon(Icons.dark_mode))
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
